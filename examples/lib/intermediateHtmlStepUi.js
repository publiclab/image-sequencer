var urlHash = require('./urlHash.js'),
  insertPreview = require('./insertPreview.js');

function IntermediateHtmlStepUi(_sequencer, step, options) {
  function stepUI(id) {
    return '<div class="row insertDiv collapse index' + id + '">\
          <section class="panel panel-primary insert-step">\
            <button class="btn btn-default close-insert-box"><i class="fa fa-times" aria-hidden="true"></i> Close</button>\
            <div class="form-inline">\
              <div class="panel-body">\
                <p class="info">Select a new module to add to your sequence.</p>\
                <div class="row center-align radio-group">\
                  <div>\
                    <div class="radio" data-value="resize">\
                      <i class="fa fa-arrows-alt fa-4x i-over"></i>\
                    </div>\
                    <p>Resize</p>\
                  </div>\
                  <div>\
                    <div class="radio" data-value="brightness">\
                      <i class="fa fa-sun-o fa-4x i-over"></i>\
                    </div>\
                    <p>Brightness</p>\
                  </div>\
                  <div>\
                    <div class="radio" data-value="contrast">\
                      <i class="fa fa-adjust fa-4x i-over"></i>\
                    </div>\
                    <p>Contrast</p>\
                  </div>\
                  <div>\
                    <div class="radio" data-value="saturation">\
                      <i class="fa fa-tint fa-4x i-over i-small"></i>\
                    </div>\
                    <p>Saturation</p>\
                  </div>\
                  <div>\
                    <div class="radio" data-value="rotate">\
                      <i class="fa fa-rotate-right fa-4x i-over"></i>\
                    </div>\
                    <p>Rotate</p>\
                  </div>\
                  <div>\
                    <div class="radio" data-value="crop">\
                      <i class="fa fa-crop fa-4x i-over"></i>\
                    </div>\
                    <p>Crop</p>\
                  </div>\
                </div>\
                <div class="row center-align">\
                  <div class="col-md-8">\
                    <select class="form-control input-lg insert-step-select">\
                      <!-- The default null selection has been appended manually in demo.js\
                      This is because the options in select are overritten when options are appended.-->\
                    </select>\
                  <div>\
                  <div class="col-md-4">\
                    <button class="btn btn-success btn-lg insert-save-btn add-step-btn" name="add">Add Step</button>\
                  <div>\
                </div>\
              </div>\
            </div>\
          </section>\
        </div>';
  }


  function selectNewStepUi() {
    var insertStepSel = '.insert-step';
    var m = $(insertStepSel + ' select').val();
    if(!m) m = arguments[0];
    $(insertStepSel + ' .info').html(_sequencer.modulesInfo(m).description);
    $(insertStepSel + ' #add-step-btn').prop('disabled', false);
  }
    
    
  var toggleDiv = function($step, callback = function(){}){
    $step('.insertDiv').collapse('toggle');
    if ($step('.insert-text').css('display') != 'none'){
      $step('.insert-text').fadeToggle(200, function(){$step('.no-insert-text').fadeToggle(200, callback);});
    }
    else {
      $step('.no-insert-text').fadeToggle(200, function(){$step('.insert-text').fadeToggle(200, callback);});
    }
  };

  insertStep = function (id) {
    const $step = step.ui.$step,
      $stepAll = step.ui.$stepAll;
    var modulesInfo = _sequencer.modulesInfo();
    var parser = new DOMParser();
    var addStepUI = stepUI(id);
    addStepUI = parser.parseFromString(addStepUI, 'text/html').querySelector('div');
    if ($step('.insertDiv').length > 0){
      toggleDiv($step);
    }
    else {
      step.ui
        .querySelector('div.step')
        .insertAdjacentElement('afterend',
          addStepUI
        );
      toggleDiv($step, function(){
        insertPreview.updatePreviews(step.output, '.insertDiv');
      });
    }

    $step('.insertDiv .close-insert-box').off('click').on('click', function(){toggleDiv($step, function(){});});
    
    var insertStepSelect = $step('.insert-step-select');
    insertStepSelect.html('');
    // Add modules to the insertStep dropdown
    for (var m in modulesInfo) {
      if (modulesInfo[m] !== undefined)
        insertStepSelect.append(
          '<option value="' + m + '">' + modulesInfo[m].name + '</option>'
        );
    }

    $('.inserDiv .add-step-btn').prop('disabled', true);
    
    insertStepSelect.append('<option value="" disabled selected>Select a Module</option>');
      
    $('.index' + id + ' .radio-group .radio').off().on('click', function (e) {
      $(this).parent().find('.radio').removeClass('selected');
      $(this).addClass('selected');
      newStep = $(this).attr('data-value');
      $step('.insert-step-select').val(newStep);
      selectNewStepUi($step);
      $(this).removeClass('selected');
      insert(id, $step, newStep);

    });
    insertStepSelect.on('change', () => {selectNewStepUi($step);});
    $step('.insertDiv .add-step-btn').on('click', function () { insert(id, $step, $(this).attr('data-value')); });
  };

  function insert(id, $step, newStepName) {

    options = options || {};
    var insertStepSelect = $('.insert-step-select');
    if (insertStepSelect.val() == 'none') return;
    if(!newStepName)
      var newStepName = insertStepSelect.val();
    toggleDiv($step);
    var sequenceLength = 1;
    if (sequencer.sequences[newStepName]) {
      sequenceLength = sequencer.sequences[newStepName].length;
    } else if (sequencer.modules[newStepName][1]['length']) {
      sequenceLength = sequencer.modules[newStepName][1]['length'];
    }
    _sequencer
      .insertSteps(id + 1, newStepName).run({index:id});

    // add to URL hash too
    urlHash.setUrlHashParameter('steps', _sequencer.toString());

  }

  return {
    insertStep
  };
}
module.exports = IntermediateHtmlStepUi;

