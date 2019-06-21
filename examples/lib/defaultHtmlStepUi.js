// Set the UI in sequencer. This Will generate HTML based on
// Image Sequencer events :
// onSetup : Called every time a step is added
// onDraw : Called every time a step starts draw
// onComplete : Called every time a step finishes drawing
// onRemove : Called everytime a step is removed
// The variable 'step' stores useful data like input and
// output values, step information.
// See documetation for more details.

var intermediateHtmlStepUi = require('./intermediateHtmlStepUi.js'),
  urlHash = require('./urlHash.js'),
  _ = require('lodash'),
  mapHtmlTypes = require('./mapHtmltypes'),
  scopeQuery = require('./scopeQuery'),
  $stepAll,
  $step;

function DefaultHtmlStepUi(_sequencer, options) {

  options = options || {};
  var stepsEl = options.stepsEl || document.querySelector('#steps');
  var selectStepSel = options.selectStepSel = options.selectStepSel || '#selectStep';

  function onSetup(step, stepOptions) {

    if (step.options && step.options.description)
      step.description = step.options.description;

    step.ui =
      '\
      <div class="container-fluid step-container">\
          <div class="panel panel-default">\
            <div class="panel-heading">\
              <div class="trash-container pull-right"></div>\
              <h3 class="panel-title">' +
                '<span class="toggle">' + step.name + ' <span class="caret toggleIcon rotated"></span>\
                 <span class="load-spin pull-right" style="display:none;padding:1px 8px;"><i class="fa fa-circle-o-notch fa-spin"></i></span>\
              </h3>\
            </div>\
            <form class="input-form">\
            <div class="panel-body cal collapse in">\
              <div class="row step">\
                <div class="col-md-4 details container-fluid">\
                  <div class="cal collapse in"><p>' +
                    '<i>' + (step.description || '') + '</i>' +
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
    '<div class="trash">\
      <button confirm="Are you sure?" class="remove btn btn-default btn-xs">\
        <i class="fa fa-trash"></i>\
      </button>\
    </div>';

    var util = intermediateHtmlStepUi(_sequencer, step);

    var parser = new DOMParser();
    step.ui = parser.parseFromString(step.ui, 'text/html');
    step.ui = step.ui.querySelector('div.container-fluid');

    $step = scopeQuery.scopeSelector(step.ui);
    $stepAll = scopeQuery.scopeSelectorAll(step.ui);

    step.linkElements = $stepAll('a');
    step.imgElement = $step('a img.img-thumbnail')[0];

    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      var merged = Object.assign(inputs, outputs); // combine outputs w inputs

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

          if (inputDesc.id == 'color-picker') { // separate input field for color-picker
            html +=
              '<div id="color-picker" class="input-group colorpicker-component">' +
              '<input class="form-control target" type="' +
              inputDesc.type +
              '" name="' +
              paramName +
              '" value="' +
              paramVal + '">' + '<span class="input-group-addon"><i></i></span>' +
              '</div>';
          }
          else { // use this if the the field isn't color-picker
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
      $step('div.panel-footer').append(
        '<div class="cal collapse in"><button type="submit" class="btn btn-sm btn-default btn-save" disabled = "true" >Apply</button> <small style="padding-top:2px;">Press apply to see changes</small></div>'
      );
      $step('div.panel-footer').prepend(
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

      $stepAll('.remove').on('click', function() {notify('Step Removed', 'remove-notification');});
      $stepAll('.insert-step').on('click', function() { util.insertStep(step.ID); });
      // Insert the step's UI in the right place
      if (stepOptions.index == _sequencer.steps.length) {
        stepsEl.appendChild(step.ui);
        $('#steps .step-container:nth-last-child(1) .insert-step').prop('disabled', true);
        if($('#steps .step-container:nth-last-child(2)'))
          $('#steps .step-container:nth-last-child(2) .insert-step').prop('disabled', false);
      } else {
        stepsEl.insertBefore(step.ui, $(stepsEl).children()[stepOptions.index]);
      }
    }
    else {
      $('#load-image').append(step.ui);
    }
    $step('.toggle').on('click', () => {
      $step('.toggleIcon').toggleClass('rotated');
      $stepAll('.cal').collapse('toggle');
    });
    
    $(step.imgElement).on('mousemove', _.debounce(() => imageHover(step), 150));
    $(step.imgElement).on('click', (e) => {e.preventDefault(); });
    $stepAll('#color-picker').colorpicker();

    function saveOptions(e) {
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

        // modify the url hash
        urlHash.setUrlHashParameter('steps', _sequencer.toString());
        // disable the save button
        $step('.btn-save').prop('disabled', true);
        optionsChanged = false;
        changedInputs = 0;
      }
    }

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



    $('input[type="range"]').on('input', function() {
      $(this).next().html($(this).val());
    });
  }


  function onDraw() {
    $step('.load').show();
    $step('img').hide();
    $stepAll('.load-spin').show();
  }

  function onComplete(step) {
    $step('img').show();
    $stepAll('.load-spin').hide();
    $step('.load').hide();

    step.imgElement.src = (step.name == 'load-image') ? step.output.src : step.output;
    var imgthumbnail = $step('.img-thumbnail');
    for (let index = 0; index < step.linkElements.length; index++) {
      if (step.linkElements[index].contains(imgthumbnail))
        step.linkElements[index].href = step.imgElement.src;
    }

    // TODO: use a generalized version of this
    function fileExtension(output) {
      return output.split('/')[1].split(';')[0];
    }

    $stepAll('.download-btn').on('click', () => {

      for (let index = 0; index < step.linkElements.length; index++){
        
        var element = document.createElement('a');
        element.setAttribute('href', step.linkElements[index].href);
        element.setAttribute('download', step.name + '.' + fileExtension(step.imgElement.src));
        element.style.display = 'none';
        document.body.appendChild(element);
        
        element.click();

        document.body.removeChild(element);
      }
    });

    // fill inputs with stored step options
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
              .val(step.options[i])
              .data('initValue', step.options[i]);
        }
      }
      for (var i in outputs) {
        if (step[i] !== undefined)
          $step('div[name="' + i + '"] input')
            .val(step[i]);
      }
    }
  }

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
    $('div[class*=imgareaselect-]').remove();
  }

  function getPreview() {
    return step.imgElement;
  }

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
    imageHover: imageHover
  };
}

if(typeof window === 'undefined'){
  module.exports = {
    DefaultHtmlStepUi: DefaultHtmlStepUi
  };
}

module.exports = DefaultHtmlStepUi;
