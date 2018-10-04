// Set the UI in sequencer. This Will generate HTML based on
// Image Sequencer events :
// onSetup : Called every time a step is added
// onDraw : Called every time a step starts draw
// onComplete : Called every time a step finishes drawing
// onRemove : Called everytime a step is removed
// The variable 'step' stores useful data like input and
// output values, step information.
// See documetation for more details.
function DefaultHtmlStepUi(_sequencer, options) {

  options = options || {};
  var stepsEl = options.stepsEl || document.querySelector("#steps");
  var selectStepSel = options.selectStepSel = options.selectStepSel || "#selectStep";

  function onSetup(step) {
    if (step.options && step.options.description)
      step.description = step.options.description;

    step.ui =
      '\
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
    <a><img alt="" style="max-width=100%" class="img-thumbnail" /></a>\
    </div>\
    </div>\
    ';

    var tools =
      '<div class="tools btn-group">\
       <button confirm="Are you sure?" class="remove btn btn btn-default">\
         <i class="fa fa-trash"></i>\
       </button>\
    </div>';

    var parser = new DOMParser();
    step.ui = parser.parseFromString(step.ui, "text/html");
    step.ui = step.ui.querySelector("div.row");
    step.linkElement = step.ui.querySelector("a");
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
          html =
            '<input class="form-control target" type="' +
            inputDesc.type +
            '" name="' +
            paramName +
            '" placeholder ="' +
            (inputDesc.placeholder || "") +
            '">';
        }

        var div = document.createElement("div");
        div.className = "row";
        div.setAttribute("name", paramName);
        var description = inputs[paramName].desc || paramName;
        div.innerHTML =
          "<div class='det'>\
                           <label for='" +
          paramName +
          "'>" +
          description +
          "</label>\
                           " +
          html +
          "\
                         </div>";
        step.ui.querySelector("div.details").appendChild(div);
      }

      function toggleSaveButton(){
        $(step.ui.querySelector("div.details .btn-save")).prop("disabled",false);
      }

      $(step.ui.querySelector(".target")).change(toggleSaveButton);

      $(step.ui.querySelector("div.details")).append(
        "<p><button class='btn btn-default btn-save' disabled = 'true' >Save</button><span> Press save to see changes</span></p>"
      );

      function saveOptions() {
        $(step.ui.querySelector("div.details"))
          .find("input,select")
          .each(function(i, input) {
            step.options[$(input).attr("name")] = input.value;
          });
        _sequencer.run({ index: step.index - 1 });

        // modify the url hash
        setUrlHashParameter("steps", _sequencer.toString());
        // disable the save button
        $(step.ui.querySelector("div.details .btn-save")).prop("disabled",true);
      }

      // on clicking Save in the details pane of the step
      $(step.ui.querySelector("div.details .btn-save")).click(saveOptions);
    }

    if (step.name != "load-image")
      step.ui
        .querySelector("div.details")
        .appendChild(
          parser.parseFromString(tools, "text/html").querySelector("div")
        );

    stepsEl.appendChild(step.ui);
  }

  function onDraw(step) {
    $(step.ui.querySelector(".load")).show();
    $(step.ui.querySelector("img")).hide();
  }

  function onComplete(step) {
    $(step.ui.querySelector(".load")).hide();
    $(step.ui.querySelector("img")).show();

    step.imgElement.src = step.output;
    step.linkElement.href = step.output;

    // TODO: use a generalized version of this
    function fileExtension(output) {
      return output.split("/")[1].split(";")[0];
    }

    step.linkElement.download = step.name + "." + fileExtension(step.output);
    step.linkElement.target = "_blank";

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
