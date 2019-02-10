var {refreshOptions} = require('./setModuleSelector');
  // {notify} = require('../../DOM/helpers');

function setSaveSequence(){
  $('#save-seq').click(() => {
    var result = window.prompt("Please give a name to your sequence... (Saved sequence will only be available in this browser).");
    if(result){
      result = result + " (local)";
      sequencer.saveSequence(result, sequencer.toString());
      sequencer.loadModules();
      // notify('Saved Sequence Success. Sequence can be found among other modules.', 'save-seq-notification', 1000);
      refreshOptions();
    }
  })
}

module.exports = setSaveSequence;