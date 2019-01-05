// Set the UI in sequencer. This Will generate HTML based on
// Image Sequencer events :
// onSetup : Called every time a step is added
// onDraw : Called every time a step starts draw
// onComplete : Called every time a step finishes drawing
// onRemove : Called everytime a step is removed
// The variable 'step' stores useful data like input and
// output values, step information.
// See documetation for more details.
function stepRemovedNotify() {
  if ($('#stepRemovedNotification').length == 0) {
    var notification = document.createElement('span');
    notification.innerHTML = ' <i class="fa fa-info-circle" aria-hidden="true"></i> Step Removed ';
    notification.id = 'stepRemovedNotification';

    $('body').append(notification);
  }

  $('#stepRemovedNotification').fadeIn(500).delay(200).fadeOut(500);
}
function DefaultHtmlStepUi(_sequencer, options) {

  options = options || {};
  var stepsEl = options.stepsEl || document.querySelector("#steps");
  var selectStepSel = options.selectStepSel = options.selectStepSel || "#selectStep";
  function onSetup(step, stepOptions) {
    if (step.options && step.options.description)
      step.description = step.options.description;

    step.ui =
      '\
      <div class="container">\
    <div class="row step">\
    <div class="col-md-4 details">\
    <h3>' +
      step.name +
      "</h3>\
    <p><i>" +
      (step.description || "") +
      '</i></p>\
    </div>\
    <div class="col-md-8">\
    <div class="load" style="display:none;"><i class="fa fa-circle-o-notch fa-spin"></i></div>\
    <a><img alt="" style="max-width=100%" class="img-thumbnail step-thumbnail"/></a>\
    </div>\
    </div>\
    </div>\
    </div>';

    var tools =
      '<div class="tools btn-group">\
       <button confirm="Are you sure?" onclick="stepRemovedNotify()" class="remove btn btn btn-default">\
         <i class="fa fa-trash"></i>\
       </button>\
       <button class="btn  insert-step" style="margin-left:10px;border-radius:6px;background-color:#fff;border:solid #bababa 1.1px;" >\
         <i class="fa fa-plus"></i> Add\
       </button>\
       </div>';

    var util = IntermediateHtmlStepUi(_sequencer, step);

    var parser = new DOMParser();
    step.ui = parser.parseFromString(step.ui, "text/html");
    step.ui = step.ui.querySelector("div.container");
    step.linkElements = step.ui.querySelectorAll("a");
    step.imgElement = step.ui.querySelector("a img");

    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      var merged = Object.assign(inputs, outputs); // combine outputs w inputs

      for (var paramName in merged) {
        var isInput = inputs.hasOwnProperty(paramName);
        var html = "";
        var inputDesc = isInput ? inputs[paramName] : {};
        if (!isInput) {
          html += '<span class="output"></span>';
        } else if (inputDesc.type.toLowerCase() == "select") {
          html += '<select class="form-control target" name="' + paramName + '">';
          for (var option in inputDesc.values) {
            html += "<option>" + inputDesc.values[option] + "</option>";
          }
          html += "</select>";
        } else {
          let paramVal = step.options[paramName] || inputDesc.default;
          html =
            '<input class="form-control target" type="' +
            inputDesc.type +
            '" name="' +
            paramName +
            '" value="' +
            paramVal +
            '" placeholder ="' +
            (inputDesc.placeholder || "");

          if (inputDesc.type.toLowerCase() == "range") {
            html +=
              '"min="' +
              inputDesc.min +
              '"max="' +
              inputDesc.max +
              '"step="' +
              inputDesc.step + '">' + '<span>' + paramVal + '</span>';

          }
          else html += '">';
        }

        var div = document.createElement("div");
        div.className = "row";
        div.setAttribute("name", paramName);
        var description = inputs[paramName].desc || paramName;
        div.innerHTML =
          "<div class='det'>\
          <form class='input-form'>\
                           <label for='" +
          paramName +
          "'>" +
          description +
          "</label>\
                           " +
          html +
          "\
          </form>\
                         </div>";
        step.ui.querySelector("div.details").appendChild(div);
      }

      function toggleSaveButton() {
        $(step.ui.querySelector("div.details .btn-save")).prop("disabled", false);
        focusInput();
      }

      $(step.ui.querySelectorAll(".target")).on('change', toggleSaveButton);

      $(step.ui.querySelector("div.details")).append(
        "<p><button class='btn btn-default btn-save' disabled = 'true' >Apply</button><span> Press apply to see changes</span></p>"
      );

      function focusInput() {
        $(step.ui.querySelector("div.details .target")).focus();
      }

      function saveOptions(e) {
        e.preventDefault();
        $(step.ui.querySelector("div.details"))
          .find("input,select")
          .each(function(i, input) {
            step.options[$(input).attr("name")] = input.value;
          });
        _sequencer.run({ index: step.index - 1 });

        // modify the url hash
        setUrlHashParameter("steps", _sequencer.toString());
        // disable the save button
        $(step.ui.querySelector("div.details .btn-save")).prop("disabled", true);
      }

      // on clicking Save in the details pane of the step
      $(step.ui.querySelector("div.details .btn-save")).click(saveOptions);
      $(step.ui.querySelector("div.details .input-form")).on('submit', saveOptions);
    }

    if (step.name != "load-image") {
      step.ui
        .querySelector("div.details")
        .appendChild(
          parser.parseFromString(tools, "text/html").querySelector("div")
        );
      $(step.ui.querySelectorAll(".insert-step")).on('click', function() { util.insertStep(step.ID) });

      // Insert the step's UI in the right place
      if (stepOptions.index == _sequencer.images.image1.steps.length) {
        stepsEl.appendChild(step.ui);
        $("#steps .container:nth-last-child(1) .insert-step").prop('disabled',true);
        if($("#steps .container:nth-last-child(2)")) 
        $("#steps .container:nth-last-child(2) .insert-step").prop('disabled',false);
      } else {
        stepsEl.insertBefore(step.ui, $(stepsEl).children()[stepOptions.index]);
      }
    }
    else {
      $("#load-image").append(step.ui);
    }
    
    $('input[type="range"]').on('input', function() {
        $(this).next().html($(this).val());
    })
  }


  function onDraw(step) {
    $(step.ui.querySelector(".load")).show();
    $(step.ui.querySelector("img")).hide();
  }

  function onComplete(step) {
    $(step.ui.querySelector(".load")).hide();
    $(step.ui.querySelector("img")).show();

    step.imgElement.src = step.output;
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
            step.ui.querySelector('div[name="' + i + '"] input').value =
              step.options[i];
          if (inputs[i].type.toLowerCase() === "select")
            step.ui.querySelector('div[name="' + i + '"] select').value =
              step.options[i];
        }
      }
      for (var i in outputs) {
        if (step[i] !== undefined)
          step.ui.querySelector('div[name="' + i + '"] input').value =
            step[i];
      }
    }
  }

  function onRemove(step) {
    step.ui.remove();
    $("#steps .container:nth-last-child(1) .insert-step").prop('disabled',true);
  }

  function getPreview() {
    return step.imgElement;
  }

  return {
    getPreview: getPreview,
    onSetup: onSetup,
    onComplete: onComplete,
    onRemove: onRemove,
    onDraw: onDraw
  }
}