// Set the UI in sequencer. This Will generate HTML based on
// Image Sequencer events :
// onSetup : Called every time a step is added
// onDraw : Called every time a step starts draw
// onComplete : Called every time a step finishes drawing
// onRemove : Called everytime a step is removed
// The variable 'step' stores useful data like input and
// output values, step information.
// See documetation for more details.

const intermediateHtmlStepUi = require('./intermediateHtmlStepUi.js'),
  urlHash = require('./urlHash.js'),
  _ = require('lodash'),
  insertPreview = require('./insertPreview.js');
  mapHtmlTypes = require('./mapHtmltypes'),
  scopeQuery = require('./scopeQuery'),
  isGIF = require('../../src/util/isGif');

function DefaultHtmlStepUi(_sequencer, options) {
  options = options || {};
  var stepsEl = options.stepsEl || document.querySelector('#steps');
  var selectStepSel = options.selectStepSel = options.selectStepSel || '#selectStep';

  function onSetup(step, stepOptions) {
    if (step.options && step.options.description)
      step.description = step.options.description;

    step.ui = // Basic UI markup for the step
      '\
      <div class="container-fluid step-container">\
          <div class="panel panel-default">\
            <div class="panel-heading">\
              <div class="trash-container pull-right">\
                <a type="button" target="_blank" href="https://developer.mozilla.org/en-US/docs/WebAssembly" style="display: none;" class="btn btn-link general-tooltip wasm-tooltip" data-toggle="tooltip" data-html="true" data-original-title="<div style=\'text-align: center\'><p>This step is Web Assembly accelerated. Click to Read More</div>">\
                  <i class="fa fa-bolt"></i>\
                </a>\
                <button type="button" class="btn btn-link ' + step.name + ' general-tooltip dimension-tooltip" data-toggle="tooltip" data-html="true" data-original-title="">\
                  <i class="fa fa-info-circle"></i>\
                </button>\
              </div>\
              <h3 class="panel-title">' +
                '<span class="toggle mouse">' + step.name + ' <span class="caret toggleIcon rotated"></span>\
                 <span class="load-spin pull-right" style="display:none;padding:1px 8px;"><i class="fa fa-circle-o-notch fa-spin"></i></span>\
              </h3>\
            </div>\
            <form class="input-form">\
            <div class="panel-body cal collapse in">\
              <div class="row step">\
                <div class="col-md-4 details container-fluid">\
                  <div class="cal collapse in"><p>' +
                    '<a href="https://github.com/publiclab/image-sequencer/blob/main/docs/MODULES.md#' + step.name + '-module">' + (step.description || '') + '</a>' +
                 '</p></div>\
                </div>\
                <div class="col-md-8 cal collapse in step-column">\
                  <div class="load load-spin" style="display:none;"><i class="fa fa-circle-o-notch fa-spin"></i></div>\
                  <div class="step-image">\
                    <a class="cal collapse in"><img class="img-thumbnail step-thumbnail"/></a>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="panel-footer cal collapse in"></div>\
            </form>\
          </div>\
      </div>';

    var tools =
    '<div class="trash" style="display: inline-block">\
      <button confirm="Are you sure?" class="remove btn btn-default btn-xs">\
        <i class="fa fa-trash"></i>\
      </button>\
    </div>';

    var util = intermediateHtmlStepUi(_sequencer, step);

    var parser = new DOMParser();
    step.ui = parser.parseFromString(step.ui, 'text/html'); // Convert the markup string to a DOM node.
    step.ui = step.ui.querySelector('div.container-fluid');

    step.$step = scopeQuery.scopeSelector(step.ui); // Shorthand methods for scoped DOM queries. Read the docs [CONTRIBUTING.md](https://github.com/publiclab/image-sequencer/blob/main/CONTRIBUTING.md) for more info.
    step.$stepAll = scopeQuery.scopeSelectorAll(step.ui);
    let {$step, $stepAll} = step;

    step.linkElements = step.ui.querySelectorAll('a'); // All the anchor tags in the step UI
    step.imgElement = $step('a img.img-thumbnail')[0]; // The output image

    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      var merged = Object.assign(inputs, outputs); // Combine outputs with inputs

      for (var paramName in merged) {
        var isInput = inputs.hasOwnProperty(paramName);
        var html = '';
        var inputDesc = isInput ? mapHtmlTypes(inputs[paramName]) : {};
        if (!isInput) {
          html += '<span class="output"></span>';
        }
        else if (inputDesc.type.toLowerCase() == 'select') {

          html += '<select class="form-control target" name="' + paramName + '">';
          for (var option in inputDesc.values) {
            html += '<option>' + inputDesc.values[option] + '</option>';
          }
          html += '</select>';
        }
        else {
          let paramVal = step.options[paramName] || inputDesc.default;

          if (inputDesc.id == 'color-picker') { // Separate input field for color-picker
            html +=
              '<div id="color-picker" class="input-group colorpicker-component">' +
              '<input class="form-control color-picker-target" type="' +
              inputDesc.type +
              '" name="' +
              paramName +
              '" value="' +
              paramVal + '">' + '<span class="input-group-addon"><i></i></span>' +
              '</div>';
          }
          else { // Non color-picker input types
            html =
              '<input class="form-control target" type="' +
              inputDesc.type +
              '" name="' +
              paramName +
              '" value="' +
              paramVal +
              '" placeholder ="' +
              (inputDesc.placeholder || '');

            if (inputDesc.type.toLowerCase() == 'range') {
              html +=
                '"min="' +
                inputDesc.min +
                '"max="' +
                inputDesc.max +
                '"step="' +
                (inputDesc.step ? inputDesc.step : 1) + '">' + '<span>' + paramVal + '</span>';

            }
            else html += '">';
          }
        }

        var div = document.createElement('div');
        div.className = 'row';
        div.setAttribute('name', paramName);
        var description = inputs[paramName].desc || paramName;
        div.innerHTML =
          '<div class=\'det cal collapse in\'>\
                           <label for=\'' +
          paramName +
          '\'>' +
          description +
          '</label>\
                           ' +
          html +
          '\
                         </div>';
        $step('div.details').append(div);
      }
      $step('div.panel-footer').append( // Save button
        '<div class="cal collapse in"><button type="submit" class="btn btn-sm btn-default btn-save" disabled = "true" >Apply</button> <small style="padding-top:2px;">Press apply to see changes</small></div>'
      );
      $step('div.panel-footer').prepend( // Markup for tools: download and insert step buttons
        '<button class="pull-right btn btn-default btn-sm insert-step" >\
        <span class="insert-text"><i class="fa fa-plus"></i> Insert Step</span><span class="no-insert-text" style="display:none">Close</span></button>\
        <button class="pull-right btn btn-default btn-sm download-btn" style="margin-right:2px" >\
        <i class="fa fa-download"></i>\
        </button>'
      );
    }

    if (step.name != 'load-image') {
      $step('div.trash-container')
        .prepend(
          parser.parseFromString(tools, 'text/html').querySelector('div')
        );

      $stepAll('.remove').on('click', function() {notify('Step Removed', 'remove-notification');}); // Notification on removal of a step
      $step('.insert-step').on('click', function() { util.insertStep(step.ID); }); // Insert a step in between the sequence
      // Insert the step's UI in the right place

      if (stepOptions.index == _sequencer.steps.length) {
        stepsEl.appendChild(step.ui);
        $('#steps .step-container:nth-last-child(1) .insert-step').prop('disabled', true);
        if($('#steps .step-container:nth-last-child(2)'))
          $('#steps .step-container:nth-last-child(2) .insert-step').prop('disabled', false);
      }
      else {
        stepsEl.insertBefore(step.ui, $(stepsEl).children()[stepOptions.index]);
      }

      // Enable the load-image insert-step button when there are steps after load-image
      // The logical operator is `> 0` because the number of steps is found before adding the step, actual logic is `steps.length + 1 > 1` which is later simplified.
      if (_sequencer.steps.length > 0) $('#load-image .insert-step').prop('disabled', false);
      else $('#load-image .insert-step').prop('disabled', true);
    }
    else {
      $('#load-image').append(step.ui); // Default UI without extra tools for the first step(load image)

      $step('div.panel-footer').prepend( `
          <button class="right btn btn-default btn-sm insert-step" disabled="true">
            <span class="insert-text"><i class="fa fa-plus"></i> Insert Step</span>
            <span class="no-insert-text" style="display:none">Close</span>
          </button>`
      );

      $step('.insert-step').on('click', function() { util.insertStep(step.ID); });
    }
    $step('.toggle').on('click', () => { // Step container dropdown
      $step('.toggleIcon').toggleClass('rotated');
      $stepAll('.cal').collapse('toggle');
    });

    $(step.imgElement).on('mousemove', _.debounce(() => imageHover(step), 150)); // Shows the pixel coordinates on hover
    $(step.imgElement).on('click', (e) => {e.preventDefault(); });
    $stepAll('#color-picker').colorpicker();

    function saveOptions(e) { // 1. SAVE OPTIONS
      e.preventDefault();
      if (optionsChanged){
        $step('div.details')
          .find('input,select')
          .each(function(i, input) {
            $(input)
              .data('initValue', $(input).val())
              .data('hasChangedBefore', false);
            step.options[$(input).attr('name')] = $(input).val();
          });
        _sequencer.run({ index: step.index - 1 });

        // Modify the URL hash
        urlHash.setUrlHashParameter('steps', _sequencer.toString());
        // Disable the save button
        $step('.btn-save').prop('disabled', true);
        optionsChanged = false;
        changedInputs = 0;
      }
    }

    /**
     * @method handleInputValueChange
     * @description Enables the save button on input change
     * @param {*} currentValue The current value of the input
     * @param {*} initValue The initial/old value of the input
     * @param {Boolean} hasChangedBefore Whether the input was changed before
     * @returns {Boolean} True if the value has changed
     */
    function handleInputValueChange(currentValue, initValue, hasChangedBefore) {
      var inputChanged = !(isNaN(initValue) || isNaN(currentValue) ? currentValue === initValue : currentValue - initValue === 0);
      changedInputs += hasChangedBefore ? inputChanged ? 0 : -1 : inputChanged ? 1 : 0;
      optionsChanged = changedInputs > 0;

      $step('.btn-save').prop('disabled', !optionsChanged);
      return inputChanged;
    }

    var
      changedInputs = 0,
      optionsChanged = false;
    $step('.input-form').on('submit', saveOptions);
    $stepAll('.target').each(function(i, input) {
      $(input)
        .data('initValue', $(input).val())
        .data('hasChangedBefore', false)
        .on('input change', function() {
          $(this)
            .focus()
            .data('hasChangedBefore',
              handleInputValueChange(
                $(this).val(),
                $(this).data('initValue'),
                $(this).data('hasChangedBefore')
              )
            );
        });
    });

    $stepAll('.color-picker-target').each(function(i, input) {
      $(input)
        .data('initValue', $(input).val())
        .data('hasChangedBefore', false)
        .on('input change', function() {
          $(this)
            .data('hasChangedBefore',
              handleInputValueChange(
                $(this).val(),
                $(this).data('initValue'),
                $(this).data('hasChangedBefore')
              )
            );
        });
    });


    $('input[type="range"]').on('input', function() {
      $(this).next().html($(this).val());
    });
  }


  function onDraw({$step, $stepAll}) {
    $step('.load').show();
    $step('img').hide();
    $stepAll('.load-spin').show();
  }

  function onComplete(step) {
    let {$step, $stepAll} = step;
    $step('img').show();
    $stepAll('.load-spin').hide();
    $step('.load').hide();

    $stepAll('.download-btn').off('click');
    
    step.imgElement.src = (step.name == 'load-image') ? step.output.src : step.output;
    var imgthumbnail = $step('.img-thumbnail').getDomElem();
    for (let index = 0; index < step.linkElements.length; index++) {
      if (step.linkElements[index].contains(imgthumbnail))
        step.linkElements[index].href = step.imgElement.src;
    }

    // TODO: use a generalized version of this.
    function fileExtension(output) {
      return output.split('/')[1].split(';')[0];
    }

    $stepAll('.download-btn').on('click', () => {

      var element = document.createElement('a');
      element.setAttribute('href', step.output);
      element.setAttribute('download', step.name + '.' + fileExtension(step.imgElement.src));
      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
    });

    // Fill inputs with stored step options
    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      for (var i in inputs) {
        if (step.options[i] !== undefined) {
          if (inputs[i].type.toLowerCase() === 'input')
            $step('div[name="' + i + '"] input')
              .val(step.options[i])
              .data('initValue', step.options[i]);
          if (inputs[i].type.toLowerCase() === 'select')
            $step('div[name="' + i + '"] select')
              .val(String(step.options[i]))
              .data('initValue', step.options[i]);
        }
      }
      for (var i in outputs) {
        if (step[i] !== undefined)
          $step('div[name="' + i + '"] input')
            .val(step[i]);
      }
    }

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
      updateDimensions(step);
    });

    if (step.name === 'load-image') insertPreview.updatePreviews(step.output.src, document.querySelector('#addStep'));
    else insertPreview.updatePreviews(step.output, document.querySelector('#addStep'));  

    // Handle the wasm bolt display

    if (step.useWasm) {
      if (step.wasmSuccess) $step('.wasm-tooltip').fadeIn();
      else $step('.wasm-tooltip').fadeOut();
    }
    else $step('.wasm-tooltip').fadeOut();
  }
  /**
   * @description Updates Dimension of the image
   * @param {Object} step  - Current Step
   * @returns {void}
   *
   */
  function updateDimensions(step){
    _sequencer.getImageDimensions(step.imgElement.src, function (dim) {
      step.ui.querySelector('.' + step.name).attributes['data-original-title'].value = `<div style="text-align: center"><p>Image Width: ${dim.width}<br>Image Height: ${dim.height}</br>${isGIF(step.output) ? `Frames: ${dim.frames}` : ''}</div>`;
    });
  }

  /**
   * @method imageHover
   * @description Handler to display image coordinates on hover.
   * @param {Object} step Current step variable
   * @returns {Null}
   */
  function imageHover(step){

    var img = $(step.imgElement);

    img.mousemove(function(e) {
      var canvas = document.createElement('canvas');
      canvas.width = img.width();
      canvas.height = img.height();
      var context = canvas.getContext('2d');
      context.drawImage(this, 0, 0);

      var offset = $(this).offset();
      var xPos = e.pageX - offset.left;
      var yPos = e.pageY - offset.top;
      var myData = context.getImageData(xPos, yPos, 1, 1);
      img[0].title = 'rgb: ' + myData.data[0] + ',' + myData.data[1] + ',' + myData.data[2];//+ rgbdata;
    });
  }

  function onRemove(step) {
    step.ui.remove();
    $('#steps .step-container:nth-last-child(1) .insert-step').prop('disabled', true);

    // Enable the load-image insert-step button when there are steps after load-image
    // The logical operator is `> 2` because the number of steps is found before removing the step, actual logic is `steps.length - 1 > 1` which is later simplified.
    if (_sequencer.steps.length - 1 > 1) $('#load-image .insert-step').prop('disabled', false);
    else $('#load-image .insert-step').prop('disabled', true);

    $(step.imgElement).imgAreaSelect({
      remove: true
    });
  }

  function getPreview() {
    return step.imgElement;
  }

  /**
   * @method notify
   * @description General purpose DOM toast notification
   * @param {String} msg Message to be displayed
   * @param {String} id A unique identifier for the notification
   * @returns {Null}
   */
  function notify(msg, id){
    if ($('#' + id).length == 0) {
      var notification = document.createElement('span');
      notification.innerHTML = ' <i class="fa fa-info-circle" aria-hidden="true"></i> ' + msg ;
      notification.id = id;
      notification.classList.add('notification');

      $('body').append(notification);
    }

    $('#' + id).fadeIn(500).delay(200).fadeOut(500);
  }


  return {
    getPreview: getPreview,
    onSetup: onSetup,
    onComplete: onComplete,
    onRemove: onRemove,
    onDraw: onDraw,
    notify: notify,
    imageHover: imageHover,
    updateDimensions: updateDimensions
  };
}

if(typeof window === 'undefined'){
  module.exports = {
    DefaultHtmlStepUi: DefaultHtmlStepUi
  };
}

module.exports = DefaultHtmlStepUi;
