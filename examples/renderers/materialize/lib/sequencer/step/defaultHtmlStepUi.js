// Set the UI in sequencer. This Will generate HTML based on
// Image Sequencer events :
// onSetup : Called every time a step is added
// onDraw : Called every time a step starts draw
// onComplete : Called every time a step finishes drawing
// onRemove : Called everytime a step is removed
// The variable 'step' stores useful data like input and
// output values, step information.
// See documetation for more details.

var intermediateHtmlStepUi = require('../step/intermediateHtmlStepUi'),
  urlHash = require('../sequence/urlHash'),
  mapTypes = require('./mapHtmlTypes'),
  { notify } = require('../../DOM/helpers'),
  initAll = require('../../DOM/initializeComponents').initializeAll,
  { initializeInputs, updateInputs } = require('../../DOM/handleInputChanges'),
  { updateTextArea } = require('../../DOM/initializeComponents'),
  { getStepTemplate, toolsTemplate } = require('../../DOM/htmlTemplates');

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.substr(1);
}

function DefaultHtmlStepUi(_sequencer, options) {
  
  options = options || {};
  var stepsEl = options.stepsEl || document.querySelector("#steps ul");

  function onSetup(step, stepOptions) {
    if (step.options && step.options.description)
      step.description = step.options.description;

    step.ui = getStepTemplate(step);

    var tools = toolsTemplate;
    var util = intermediateHtmlStepUi(_sequencer, step);

    var parser = new DOMParser();
    step.ui = parser.parseFromString(step.ui, "text/html");
    step.ui = step.ui.querySelector(".step-wrapper");
    step.linkElements = step.ui.querySelectorAll("a");
    step.imgElement = step.ui.querySelector(".step-thumbnail");
    step.imgElement.alt = step.name;

    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      var merged = Object.assign(inputs, outputs); // combine outputs w inputs

      for (var paramName in merged) {
        var isInput = inputs.hasOwnProperty(paramName);
        var html = "";
        var inputDesc = isInput ? mapTypes(inputs[paramName]) : {};
        if (!isInput) {
          html += '<span class="output"></span>';
        } else if (inputDesc.type == "select") {
            html += `<div name="${paramName} class="input-field"><select class="target" name="${paramName}">`;
            for (var option in inputDesc.values) {
              html += `<option value="${inputDesc.values[option]}">${inputDesc.values[option]}</option>`;
            }
            html += '</select></div>';
        } else {
          let paramVal = step.options[paramName] || inputDesc.default;
          if (inputDesc.type == 'text'){
            html +=
              `<div class="input-field">
                <textarea
                  class="materialize-textarea target"\
                  name="${paramName}"
                  id="${paramName}"
                  placeholder="${inputDesc.placeholder || ''}"
                >${paramVal}</textarea`;
          }
          else {
            html +=
              `<div class="input-field">\
                <input class="validate target"\
                  type="${inputDesc.type}"
                  name="${paramName}"
                  id="${paramName}"
                  value="${paramVal}"
                  placeholder ="${inputDesc.placeholder || ""}"`;
          }

          if (inputDesc.type == 'range') {
            html +=`
            min="${inputDesc.min}"
            max="${inputDesc.max}"
            step="${inputDesc.step ? inputDesc.step : '1'}">
            </div>`;

          }
          else html += `><label for="${paramName}">${capitalize(paramName)}</label></div>`;
        }

        var input = document.createElement("div");
        input.className = "row";
        input.setAttribute("name", paramName);
        var description = inputDesc.desc || "";
        input.innerHTML = `
        <div class="det">\
          <span>${description}</span>
          ${html}
        </div>`;
        step.ui.querySelector("div.details").appendChild(input);
      }

      $(step.ui.querySelector("div.details")).append(
        '<div class="cal"><p><button type="submit" class="btn btn-save" disabled="true" >Apply</button><span> Press apply to see changes</span></p></div>'
      );

    }

    if (step.name != "load-image") {
      step.ui
        .querySelector("div.details")
        .appendChild(
          parser.parseFromString(tools, "text/html").querySelector("div")
        );
      $(step.ui.querySelectorAll(".remove")).on('click', function() {notify('Step Removed','remove-notification')});  
      $(step.ui.querySelectorAll(".insert-step-btn")).on('click', function() { util.insertStep(step.ID) });

      // Insert the step's UI in the right place
      if (stepOptions.index == _sequencer.images.image1.steps.length) {
        $(stepsEl).append(step.ui);
        $("#steps ul li:nth-last-child(1) .insert-step-btn").prop('disabled',true);
        if($("#steps ul li:nth-last-child(2)"))
          $("#steps ul li:nth-last-child(2) .insert-step-btn").prop('disabled',false);
      } else {
        stepsEl.insertBefore(step.ui, $(stepsEl).children()[stepOptions.index]);
      }
    }
    else {
      $(stepsEl).append(step.ui);
    }

    step.changedInputs = 0;
    step.optionsChanged = false;
    function saveOptions(e) {
      e.preventDefault();
      if (step.optionsChanged){
        $(step.ui.querySelector("div.details"))
          .find("input,select,textarea")
          .each(function(i, input) {
            updateInputs(input);
            step.options[$(input).attr("name")] = $(input).val();
          });
        _sequencer.run({ index: step.index - 1 });

        // modify the url hash
        urlHash.setUrlHashParameter("steps", _sequencer.toString());

        // disable the save button
        $(step.ui.querySelector('.btn-save')).prop('disabled', true);
        step.optionsChanged = false;
        step.changedInputs = 0;
        updateTextArea();
      }
    }

    $(step.ui.querySelector('.input-form')).on('submit', saveOptions);
    $(step.ui.querySelectorAll('.target')).each(function(i, input){initializeInputs(input, step)});
    initAll();
  }


  function onDraw(step) {
    $(step.ui.querySelector(".load")).show();
    $(step.ui.querySelector("img")).hide();
    if( $(step.ui.querySelector(".toggleIcon")).hasClass("fa-caret-down") )
    {
      $(step.ui.querySelector(".load-spin")).show();
    }
  }

  function onComplete(step) {
    $(step.ui.querySelector(".load")).hide();
    $(step.ui.querySelector("img")).show();
    $(step.ui.querySelector(".load-spin")).hide();

    step.imgElement.src = step.output;

    $(step.ui.querySelector('.download-step-btn')).on('click', function(){
      download(step.output, step.name + '.png', 'image/png')
    })

    var imgthumbnail = step.ui.querySelector(".img-thumbnail");
    for (let index = 0; index < step.linkElements.length; index++) {
      if (step.linkElements[index].contains(imgthumbnail))
        step.linkElements[index].href = step.output;
    }

    // TODO: use a generalized version of this
    function fileExtension(output) {
      return output.split("/")[1].split(";")[0];
    }

    for (let index = 0; index < step.linkElements.length; index++) {
      step.linkElements[index].download = step.name + "." + fileExtension(step.output);
      step.linkElements[index].target = "_blank";
    }

    // fill inputs with stored step options
    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      for (var i in inputs) {
        if (step.options[i] !== undefined) {
          if (inputs[i].type.toLowerCase() === "input")
            $(step.ui.querySelector('div[name="' + i + '"] input'))
              .val(step.options[i])
              .data('initValue', step.options[i]);
          if (inputs[i].type.toLowerCase() === "input")
            $(step.ui.querySelector('div[name="' + i + '"] textarea'))
              .val(step.options[i])
              .data('initValue', step.options[i]);
          if (inputs[i].type.toLowerCase() === "select")
            $(step.ui.querySelector('div[name="' + i + '"] select'))
              .data('initValue', step.options[i])
              .find('option[value="'+step.options[i]+'"]')
              .prop('selected', true);
            $(step.ui.querySelector('div[name="' + i + '"] select')).formSelect();
        }
      }
      for (var i in outputs) {
        if (step[i] !== undefined)
          $(step.ui.querySelector('div[name="' + i + '"] input textarea'))
            .val(step[i]);
      }
    }
    updateTextArea();
  }

  function onRemove(step) {
    step.ui.remove();
    $("#steps .container:nth-last-child(1) .insert-step-btn").prop('disabled',true);
    $('div[class^=imgareaselect-]').remove();
  }

  function getPreview() {
    return step.imgElement;
  }

  return {
    getPreview: getPreview,
    onSetup: onSetup,
    onComplete: onComplete,
    onRemove: onRemove,
    onDraw: onDraw, 
    notify: notify
  }
}

if(typeof window === "undefined"){
  module.exports={
    DefaultHtmlStepUi: DefaultHtmlStepUi
  }
}

module.exports = DefaultHtmlStepUi;

