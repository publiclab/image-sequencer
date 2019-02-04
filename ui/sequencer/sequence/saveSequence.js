var {refreshOptions} = require('./setModuleSelector');

function setSaveSequence(saveSeqSel, selectStepSel, saveSeqCb){
  $(saveSeqSel || '#save-seq').click(() => {
    var seqName = window.prompt("Please give a name to your sequence... (Saved sequence will only be available in this browser).");
    if(seqName){
      seqName = seqName + " (local)";
      sequencer.saveSequence(seqName, sequencer.toString());
      sequencer.loadModules();
      if (saveSeqCb) saveSeqCb(seqName);
      refreshOptions(selectStepSel);
    }
  })
}

module.exports = setSaveSequence;