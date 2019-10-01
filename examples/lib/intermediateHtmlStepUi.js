var urlHash = require('./urlHash.js'),
  insertPreview = require('./insertPreview.js');

function IntermediateHtmlStepUi(_sequencer, step, options) {
  function stepUI() {
    return '<div class="row insertDiv collapse">\
          <section class="panel panel-primary .insert-step">\
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
                    <select class="insert-step-select">\
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
    var addStepUI = stepUI();
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

    $step('.insertDiv .close-insert-box').off('click').on('click', function(){
      toggleDiv($step);
      $step('.insertDiv').removeClass('insertDiv');
    });
    
    var insertStepSelect = $step('.insert-step-select');
    insertStepSelect.html('');
    // Add modules to the insertStep dropdown
    for (var m in modulesInfo) {
      if (modulesInfo[m] && modulesInfo[m].name)
        insertStepSelect.append(
          '<option value="' + m + '">' + modulesInfo[m].name + '</option>'
        );
    }
    insertStepSelect.selectize({
      sortField: 'text'
    });
    $('.insertDiv .radio-group .radio').on('click', function () {
      var newStepName = $(this).attr('data-value');
      id = $($step('.insertDiv').parents()[3]).prevAll().length;
      insert(id, $step, newStepName);
    });
    $step('.insertDiv .add-step-btn').on('click', function () {
      var newStepName = insertStepSelect.val();
      id = $($step('.insertDiv').parents()[3]).prevAll().length;
      insert(id, $step, newStepName); });
  };

  function insert(id, $step, newStepName) {
    toggleDiv($step);
    $step('.insertDiv').removeClass('insertDiv');
    _sequencer.insertSteps(id + 1, newStepName).run({ index: id });
    urlHash.setUrlHashParameter('steps', _sequencer.toString());
  }

  return {
    insertStep
  };
}
module.exports = IntermediateHtmlStepUi;