function DefaultHtmlSequencerUi(_sequencer, options) {

  options = options || {};
  var addStepSel = options.addStepSel = options.addStepSel || "#addStep";
  var removeStepSel = options.removeStepSel = options.removeStepSel || "button.remove";
  var selectStepSel = options.selectStepSel = options.selectStepSel || "#selectStep";

  function onLoad() {
    importStepsFromUrlHash();
    $(addStepSel + " button").prop("disabled",true);
  }

  // look up needed steps from Url Hash:
  function importStepsFromUrlHash() {
    var hash = getUrlHashParameter("steps");

    if (hash) {
      _sequencer.importString(hash);
      _sequencer.run({index:0});
    }
    setUrlHashParameter("steps", sequencer.toString());
  }

  function selectNewStepUi() {
    var m = $(addStepSel + " select").val();
    $(addStepSel + " .info").html(_sequencer.modulesInfo(m).description);
    $(addStepSel + " button").prop("disabled",false);
  }

  function removeStepUi() {
    var index = $(removeStepSel).index(this) + 1;
    sequencer.removeSteps(index).run({index : index-1});
    // remove from URL hash too
    setUrlHashParameter("steps", sequencer.toString());
  }

  function addStepUi() {
    if ($(addStepSel + " select").val() == "none") return;

    var newStepName = $(addStepSel + " select").val();

    /*
    * after adding the step we run the sequencer from defined step
    * and since loadImage is not a part of the drawarray the step lies at current
    * length - 2 of the drawarray
    */
    _sequencer
    .addSteps(newStepName, options)
    .run({index: _sequencer.images.image1.steps.length - 2});

    // add to URL hash too
    setUrlHashParameter("steps", _sequencer.toString());
  }

  return {
    onLoad: onLoad,
    importStepsFromUrlHash: importStepsFromUrlHash,
    selectNewStepUi: selectNewStepUi,
    removeStepUi: removeStepUi,
    addStepUi: addStepUi
  }
}
