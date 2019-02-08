var urlHash = require('../sequence/urlHash'),
  { updatePreviews } = require('../../DOM/insertPreview');
function IntermediateHtmlStepUi(_sequencer, step, options) {

  var getStepInsertTemplate = options.getStepInsertTemplate,
    insertStepSel = options.insertStepSel || '.insert-step',
    insertUi = options.insertUi,
    insertStepCb = options.insertStepCb;

  function stepUI() {
    return getStepInsertTemplate(step);
  }

  function insert(id) {
    options = options || {};
    var insertStepSelect = $(insertStepSelectSel);
    if (insertStepSelect.val() == 'none') return;

    var newStepName = insertStepSelect.val()
    
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

  function selectNewStepUi(addStepUI) {
    insertUi(addStepUI)

    var m = $(`${insertStepSel} select`).val();
    $(`${insertStepSel} .info`).html(_sequencer.modulesInfo(m).description);
    $(`${insertStepSel} .add-step-btn`).prop("disabled", false);
  }
  insertStep = function (id) {
    var modulesInfo = _sequencer.modulesInfo();
    var parser = new DOMParser();
    var addStepUI = stepUI();
    addStepUI = parser.parseFromString(addStepUI, "text/html").querySelector('.insert-step');

    var insertStepSelect = $(insertStepSelectSel);
    insertStepSelect.html('');
    // Add modules to the insert-step dropdown
    for (var m in modulesInfo) {
      if (modulesInfo[m] !== undefined)
        insertStepSelect.append(
          '<option value="' + m + '">' + modulesInfo[m].name + "</option>"
        );
    }

    $(`${insertStepSel} .add-step-btn`).prop('disabled', true);

    insertStepSelect.append('<option value="none" disabled selected>More modules...</option>');
    $(options.quickBtnsSel).on('click', function() {
      $(options.quickBtnsSel).removeClass('selected');
      $(this).addClass('selected');
      newStep = $(this).attr('data-value');
      insertStepSelect.val(newStep);
      selectNewStepUi();
      insert(id)
      $(this).removeClass('selected');
    });

    $(step.ui.querySelector(`${insertStepSel} select`)).on('change', selectNewStepUi);
    $(step.ui.querySelector(`${insertStepSelect} .add-step-btn`)).on('click', function () { insert(id) });

    updatePreviews(step.output, options.quickBtnsSel);

    if (insertStepCb) insertStepCb();
  }

  return {
    insertStep
  }
}
module.exports = IntermediateHtmlStepUi;

