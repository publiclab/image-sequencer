// add steps to the sequencer 
function AddStep(_sequencer, image, name, o) {

  function addStep(image, name, o_) {
    var moduleInfo = _sequencer.modules[name][1];

    var o = _sequencer.copy(o_);
    o.number = _sequencer.options.sequencerCounter++; // gives a unique ID to each step
    o.name = o_.name || name || moduleInfo.name;
    o.description = o_.description || moduleInfo.description;
    o.selector = o_.selector || 'ismod-' + name;
    o.container = o_.container || _sequencer.options.selector;
    o.image = image;
    o.inBrowser = _sequencer.options.inBrowser;

    o.step = {
      name: o.name,
      description: o.description,
      ID: o.number,
      imageName: o.image,
      inBrowser: _sequencer.options.inBrowser,
      ui: _sequencer.options.ui,
      options: o
    };
    var UI = _sequencer.events;
    var module = _sequencer.modules[name][0](o,UI);
    _sequencer.images[image].steps.push(module);

    return true;
  }

  addStep(image, name, o);
}
module.exports = AddStep;
