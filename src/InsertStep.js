const getStepUtils = require('./util/getStep.js');

// insert one or more steps at a given index in the sequencer
function InsertStep(ref, index, name, o) {
  if (ref.sequences[name]) {
    return ref.importJSON(ref.sequences[name]);
  }

  if (ref.detectStringSyntax(name)) {
    return ref.stringToSteps(name);
  }

  function insertStep(index, name, o_) {
    if (ref.modules[name]) var moduleInfo = ref.modules[name][1];
    else {
      console.log('Module ' + name + ' not found.');
    }

    var o = ref.copy(o_);

    o.number = ref.options.sequencerCounter++; //Gives a Unique ID to each step
    o.name = o_.name || name || moduleInfo.name;
    o.description = o_.description || moduleInfo.description;
    o.selector = o_.selector || 'ismod-' + name;
    o.container = o_.container || ref.options.selector;
    o.inBrowser = ref.options.inBrowser;

    if (index == -1) index = ref.steps.length;

    o.step = {
      name: o.name,
      description: o.description,
      ID: o.number,
      inBrowser: ref.options.inBrowser,
      ui: ref.options.ui,
      options: o
    };
    var UI = ref.events;

    // define the expandSteps function for sequencer
    ref.modules[name].expandSteps = function expandSteps(stepsArray) {
      for (var i in stepsArray) {
        let step = stepsArray[i];
        ref.insertSteps(index + Number.parseInt(i), step['name'], step['options']);
      }
    };

    // Tell UI that a step has been set up.
    o = o || {};

    if (!ref.modules[name][1].length) {
      UI.onSetup(o.step, { index: index });
      ref.steps.splice(index, 0, ref.modules[name][0](o, UI));
    } else {
      ref.modules[name][0](o, UI);
    }

    return true;
  }

  insertStep(index, name, o);
  ref.steps = ref.steps;

}
module.exports = InsertStep;
