function DefaultHtmlSequencerUi(_sequencer, options) {

  options = options || {};
  var addStepSel = options.addStepSel = options.addStepSel || "#addStep";
  var removeStepSel = options.removeStepSel = options.removeStepSel || "button.remove";
  var selectStepSel = options.selectStepSel = options.selectStepSel || "#selectStep";

  function onLoad() {
    importStepsFromUrlHash();
    if (!$('#selectStep').val())
      $(addStepSel + " #add-step-btn").prop("disabled", true);
      handleSaveSequence();
  }

  // look up needed steps from Url Hash:
  function importStepsFromUrlHash() {
    var hash = getUrlHashParameter("steps");

    if (hash) {
      _sequencer.importString(hash);
      _sequencer.run({ index: 0 });
    }
    setUrlHashParameter("steps", sequencer.toString());
  }

  function selectNewStepUi() {
    var m = $(addStepSel + " select").val();
    $(addStepSel + " .info").html(_sequencer.modulesInfo(m).description);
    $(addStepSel + " #add-step-btn").prop("disabled", false);
  }

  function removeStepUi() {
    var index = $(removeStepSel).index(this) + 1;
    sequencer.removeSteps(index).run({ index: index - 1 });
    // remove from URL hash too
    setUrlHashParameter("steps", sequencer.toString());
    //disable save-sequence button if all steps are removed
    handleSaveSequence();
  }

  function addStepUi() {
    if ($(addStepSel + " select").val() == "none") return;

    var newStepName = $(addStepSel + " select").val();

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

    //enable save-sequence button if disabled initially
    handleSaveSequence();

    // add to URL hash too
    setUrlHashParameter("steps", _sequencer.toString());
  }

  function handleSaveSequence(){
    var stepCount=sequencer.images.image1.steps.length;
    if(stepCount<2)
    $(" #save-seq").prop("disabled", true);
    else
    $(" #save-seq").prop("disabled", false);
  }

  return {
    onLoad: onLoad,
    importStepsFromUrlHash: importStepsFromUrlHash,
    selectNewStepUi: selectNewStepUi,
    removeStepUi: removeStepUi,
    addStepUi: addStepUi
  }
}
