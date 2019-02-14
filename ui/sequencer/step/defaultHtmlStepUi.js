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
  { notify } = require('../../DOM/helpers');

function DefaultHtmlStepUi(_sequencer, options) {
  
  options = options || {};
  var stepsSel = options.stepsSel || '#steps ul',
    getStepTemplate = options.getStepTemplate,
    getToolsTemplate = options.getToolsTemplate,
    stepWrapperSel = options.stepWrapperSel || '.step-wrapper',
    stepImgClass = options.stepImgClass || '.step-thumbnail',
    saveOptionsInputCb = options.saveOptionsInputCb,
    optionsSavedCb = options.optionsSavedCb,
    initializeInputs = options.initializeInputs,
    inputTemplates = options.inputTemplates,
    onSetupCb = options.onSetupCb,
    onDrawCb = options.onDrawCb,
    setInputDefaultCb = options.setInputDefaultCb,
    onCompleteCb = options.onCompleteCb;

  function onSetup(step, stepOptions) {
    if (step.options && step.options.description)
      step.description = step.options.description;

    step.ui = getStepTemplate(step);

    var tools = getToolsTemplate(step);
    var util = intermediateHtmlStepUi(_sequencer, step, options);

    var parser = new DOMParser();
    step.ui = parser.parseFromString(step.ui, "text/html");
    step.ui = step.ui.querySelector(stepWrapperSel);
    step.imgLinkElements = step.ui.querySelectorAll(".img-link");
    step.imgElement = step.ui.querySelector(stepImgClass);
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
        }
        else if (inputDesc.type == "select") {
          html += inputTemplates.getSelectInputTemplate(paramName, inputDesc);
        }
        else if (inputDesc.type == 'text'){
          html += inputTemplates.getTextTemplate(paramName, inputDesc);
        }
        else if (inputDesc.type == 'range'){
          html += inputTemplates.getRangeTemplate(paramName, inputDesc);
        }
        else {
          html += inputTemplates.getDefaultTemplate(paramName, inputDesc);
        }

        var input = document.createElement("div");
        input.className = "det";
        input.setAttribute("name", paramName);
        var description = inputDesc.desc || "";
        input.innerHTML = `
        <span>${description}</span>
        ${html}`;
        $(step.ui.querySelector('div.details')).append(input);
      }

      $(step.ui.querySelector('div.details')).append(
        '<div><p><button type="submit" class="btn btn-save" disabled="true" >Apply</button><span> Press apply to see changes</span></p></div>'
      );

    }

    if (step.name != "load-image") {
      step.ui
        .querySelector("div.details")
        .appendChild(
          parser.parseFromString(tools, 'text/html').querySelector('.tools')
        );
      $(step.ui.querySelectorAll('.remove-btn')).on('click', notify('Step Removed', 'step-removed-notification', 'notification'));  
      $(step.ui.querySelectorAll('.insert-step-btn')).on('click', function() { util.insertStep(step.ID) });

      // Insert the step's UI in the right place
      if (stepOptions.index == _sequencer.images.image1.steps.length) {
        $(stepsSel).append(step.ui);
        $(`${stepsSel} li:nth-last-child(1) .insert-step-btn`).prop('disabled',true);
        if($(`${stepsSel} li:nth-last-child(2)`))
          $(`${stepsSel} li:nth-last-child(2) .insert-step-btn`).prop('disabled',false);
      } else {
        $(stepsSel).insertBefore(step.ui, $(stepsSel).children()[stepOptions.index]);
      }
    }
    else {
      $(stepsSel).append(step.ui);
    }

    step.changedInputs = 0;
    step.optionsChanged = false;
    function saveOptions(e) {
      e.preventDefault();
      if (step.optionsChanged){
        $(step.ui.querySelector("div.details"))
          .find("input,select,textarea")
          .each(function(i, input) {
            if (saveOptionsInputCb) saveOptionsInputCb(input);
            step.options[$(input).attr("name")] = $(input).val();
          });
        _sequencer.run({ index: step.index - 1 });

        // modify the url hash
        urlHash.setUrlHashParameter("steps", _sequencer.toString());

        // disable the save button
        step.optionsChanged = false;
        step.changedInputs = 0;
        if (optionsSavedCb) optionsSavedCb(step);
      }
    }

    $(step.ui.querySelector('.input-form')).on('submit', saveOptions);
    if (initializeInputs) $(step.ui.querySelectorAll('.target')).each(function(i, input){initializeInputs(input, step)});
    if (onSetupCb) onSetupCb(step);
  }


  function onDraw(step) {
    $(step.ui.querySelector('.loader')).show();
    $(step.ui.querySelector('.step-thumbnail')).hide();
    if (onDrawCb) onDrawCb(step);
  }

  function onComplete(step) {
    $(step.ui.querySelector('.loader')).hide();
    $(step.ui.querySelector('.step-thumbnail')).show();
    $(step.ui.querySelector('.loader')).hide();

    step.imgElement.src = step.output;

    $(step.ui.querySelector('.download-step-btn')).on('click', function(){
      download(step.output, step.name + '.png', 'image/png');
    })

    // TODO: use a generalized version of this
    function fileExtension(output) {
      return output.split("/")[1].split(";")[0];
    }

    // fill inputs with stored step options
    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      for (var i in inputs) {
        if (step.options[i] !== undefined) {
          if (inputs[i].type.toLowerCase() === "input")
            $(step.ui.querySelector('div[name="' + i + '"] input'))
              .val(step.options[i]);
          if (inputs[i].type.toLowerCase() === "input")
            $(step.ui.querySelector('div[name="' + i + '"] textarea'))
              .val(step.options[i]);
          if (inputs[i].type.toLowerCase() === "select")
            $(step.ui.querySelector('div[name="' + i + '"] select'))
              .find('option[value="'+step.options[i]+'"]')
              .prop('selected', true);
          var input = $(step.ui.querySelector('div[name="' + i + '"]'));
          if (setInputDefaultCb) setInputDefaultCb(input);
        }
      }
      for (var i in outputs) {
        if (step[i] !== undefined)
          $(step.ui.querySelector('div[name="' + i + '"] input,textarea'))
            .val(step[i]);
      }
    }

    if (onCompleteCb) onCompleteCb(step);
  }

  function onRemove(step) {
    step.ui.remove();
    $(`${stepsSel} ${stepWrapperSel}:nth-last-child(1) .insert-step-btn`).prop('disabled',true);
    $('div[class^=imgareaselect-]').remove();

    if (onRemoveCb) onRemoveCb(step);
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
  module.exports = {
    DefaultHtmlStepUi: DefaultHtmlStepUi
  }
}

module.exports = DefaultHtmlStepUi;

