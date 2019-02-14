var urlHash = require('./urlHash.js'),
  setModuleSelector = require('./setModuleSelector').setModuleSelector;

function DefaultHtmlSequencerUi(_sequencer, options) {
  options = options || {};
  var addStepSel = options.addStepSel || '#addStep',
    removeStepSel = options.removeStepSel || 'button.remove',
    selectStepSel = options.selectStepSel || '#selectStep';
    saveSeqBtn = options.saveSeqBtn || '#save-seq';

    options.quickBtnsSelect = options.quickBtnsSel || '.quick-btns .quick-btn';
    options.addStepBtnSel = options.addStepBtnSel || '.add-step-btn';
    
  function handleSaveSequence(){
    var stepCount=sequencer.images.image1.steps.length;
    if(stepCount<2)
      $(saveSeqBtn).prop("disabled", true);
    else
      $(saveSeqBtn).prop("disabled", false);
  }

  function onLoad(stepAddedCb = function(){}) {
    importStepsFromUrlHash();
    if (!$(selectStepSel).val())
      stepAddedCb();
      handleSaveSequence();
    setModuleSelector({
      sequencer: _sequencer,
      options: options,
      onLoad: onLoad,
      importStepsFromUrlHash: importStepsFromUrlHash,
      selectNewStepUi: selectNewStepUi,
      removeStepUi: removeStepUi,
      addStepUi: addStepUi
    });
  }

  // look up needed steps from Url Hash:
  function importStepsFromUrlHash() {
    var hash = urlHash.getUrlHashParameter("steps");

    if (hash) {
      _sequencer.importString(hash);
      _sequencer.run({ index: 0 });
    }
    urlHash.setUrlHashParameter("steps", sequencer.toString());
  }

  function selectNewStepUi(stepSelectCb) {
    var m = $(selectStepSel).val();
    $(`${addStepSel} .info`).html(_sequencer.modulesInfo(m).description);
    if (stepSelectCb) stepSelectCb();
  }

  function removeStepUi() {
    var index = $(removeStepSel).index(this) + 1;
    sequencer.removeSteps(index).run({ index: index - 1 });
    // remove from URL hash too
    urlHash.setUrlHashParameter("steps", sequencer.toString());
    //disable save-sequence button if all steps are removed
    handleSaveSequence();
  }

  function addStepUi(sequenceSavableCb) {
    if ($(selectStepSel).val() == "none") return;

    var newStepName = $(selectStepSel).val();

    /*
    * after adding the step we run the sequencer from defined step
    * and since loadImage is not a part of the drawarray the step lies at current
    * length - 2 of the drawarray
    */
    var sequenceLength = 1;
    if (sequencer.sequences[newStepName]) {
      sequenceLength = sequencer.sequences[newStepName].length;
    } else if (sequencer.modules[newStepName][1]["length"]) {
      sequenceLength = sequencer.modules[newStepName][1]["length"];
    }
    _sequencer
      .addSteps(newStepName, options)
      .run({ index: _sequencer.images.image1.steps.length - sequenceLength - 1 });
      $(`${addStepSel} ${stepInfoSel}`).html("Select a new module to add to your sequence.");

    // Callback
    var sequenceSavable = sequencer.images.image1.steps.length > 1;
    if (sequenceSavableCb) sequenceSavableCb(sequenceSavable);

    // Add to URL hash too
    urlHash.setUrlHashParameter("steps", _sequencer.toString());
  }

  return {
    sequencer: _sequencer,
    options: options,
    onLoad: onLoad,
    importStepsFromUrlHash: importStepsFromUrlHash,
    selectNewStepUi: selectNewStepUi,
    removeStepUi: removeStepUi,
    addStepUi: addStepUi
  }
}

module.exports = DefaultHtmlSequencerUi;

