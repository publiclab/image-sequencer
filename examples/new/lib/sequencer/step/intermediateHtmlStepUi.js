var urlHash = require('../sequence/urlHash'),
  initSelect = require('../../DOM/initializeComponents').initializeSelect,
  { updatePreviews } = require('../../DOM/insertPreview'),
  { Collapse } = require('../../DOM/helpers'),
  { stepInsertTemplate } = require('../../DOM/htmlTemplates');
function IntermediateHtmlStepUi(_sequencer, step, options) {
  function stepUI() {
    return stepInsertTemplate;
  }

  function insert(id) {
    options = options || {};
    var insertStepSelect = $(".insert-step select");
    if (insertStepSelect.val() == "none") return;

    var newStepName = insertStepSelect.val()
    $('div.insertDiv').remove();
    var sequenceLength = 1;
    
    if (sequencer.sequences[newStepName]) {
      sequenceLength = sequencer.sequences[newStepName].length;
    } else if (sequencer.modules[newStepName][1]['length']) {
      sequenceLength = sequencer.modules[newStepName][1]['length'];
    }
    _sequencer
      .insertSteps(id + 1, newStepName).run({ index: id });

    // add to URL hash too
    urlHash.setUrlHashParameter('steps', _sequencer.toString());
  }

  function selectNewStepUi() {
    if ($(step.ui.querySelector('div.insertDiv')).length > 0){
      window.step = step.ui;
      $(step.ui.querySelector('div.insertDiv')).collapse('toggle');
      return;
    }
    step.ui
      .querySelector("div.step")
      .insertAdjacentElement('afterend',
        addStepUI
    );
    $(step.ui.querySelector('div.insertDiv').collapse('toggle'));

    var m = $(".insert-step select").val();
    $(".insert-step .info").html(_sequencer.modulesInfo(m).description);
    $(".insert-step .add-step-btn").prop("disabled", false);
  }
  insertStep = function (id) {
    var modulesInfo = _sequencer.modulesInfo();
    var parser = new DOMParser();
    var addStepUI = stepUI();
    addStepUI = parser.parseFromString(addStepUI, "text/html").querySelector("div");

    var toggleDiv = function(callback){
      $(step.ui.querySelector('.insert-step-btn')).animate({opacity: 0.5}, 200).toggleClass('green').toggleClass('amber').animate({opacity: 1}, 200);
      Collapse($(step.ui.querySelector('.insertDiv')).fadeToggle(200), 'toggle');
      if ($(step.ui.querySelector('.insert-text')).css('display') != "none"){
        $(step.ui.querySelector('.insert-text')).fadeToggle(200, function(){$(step.ui.querySelector('.no-insert-text')).fadeToggle(200, callback)})
      }
      else {
        $(step.ui.querySelector('.no-insert-text')).fadeToggle(200, function(){$(step.ui.querySelector('.insert-text')).fadeToggle(200, callback)})
      }
    }

    if ($(step.ui.querySelector('.insertDiv')).length > 0){
      toggleDiv();
    }
    else {
      step.ui
        .querySelector("div.step")
        .insertAdjacentElement('afterend',
          addStepUI
        );
      toggleDiv(function(){
        updatePreviews(step.output,'.insert-step');
      });
    }

    var insertStepSelect = $('.insert-step select');
    insertStepSelect.html('');
    // Add modules to the insert-step dropdown
    for (var m in modulesInfo) {
      if (modulesInfo[m] !== undefined)
        insertStepSelect.append(
          '<option value="' + m + '">' + modulesInfo[m].name + "</option>"
        );
    }

    $('.insert-step .add-step-btn').prop('disabled', true);

    insertStepSelect.append('<option value="none" disabled selected>More modules...</option>');
    $('.insert-step .radio-group .radio').on("click", function () {
      $(this).parent().find('.radio').removeClass('selected');
      $(this).addClass('selected');
      newStep = $(this).attr('data-value');
      insertStepSelect.val(newStep);
      selectNewStepUi();
      insert(id);
      $(this).removeClass('selected');
    });
    $(step.ui.querySelector(".insert-step select")).on('change', selectNewStepUi);
    $(step.ui.querySelector(".insert-step .add-step-btn")).on('click', function () { insert(id) });
    initSelect();
  }

  return {
    insertStep
  }
}
module.exports = IntermediateHtmlStepUi;

