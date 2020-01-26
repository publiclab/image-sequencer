module.exports = function OverlayModuleUi(step, ui) {

  function setup() {
    var steps = sequencer.getSteps();
    steps.forEach(function (_step, index) {
      if(_step.options && step.options.number === _step.options.number) {
        if(index === 1){
          step.ui.querySelector('input[type=range]').value = -1;
          step.ui.querySelector('input[type=range]').min = -1;
        }else
          step.ui.querySelector('input[type=range]').min = -index;
      }
    });
  }

  return {
    setup: setup
  };
};
