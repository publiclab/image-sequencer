// insert one or more steps at a given index in the sequencer
function InsertStep(ref, image, index, name, o) {

  function insertStep(image, index, name, o_) {
    var o = ref.copy(o_);
    o.number = ref.options.sequencerCounter++; //Gives a Unique ID to each step
    o.name = o_.name || name;
    o.selector = o_.selector || 'ismod-' + name;
    o.container = o_.container || ref.options.selector;
    o.image = image;

    if(index==-1) index = ref.images[image].steps.length;

    o.step = {
      name: o.name,
      description: o.description,
      url: o.url,
      ID: o.number,
      imageName: o.image,
      inBrowser: ref.options.inBrowser,
      ui: ref.options.ui,
      options: o
    };
    var UI = ref.events;
    var module = ref.modules[name][0](o,UI);
    ref.images[image].steps.splice(index,0,module);

    return true;
  }

  insertStep(image, index, name, o);
}
module.exports = InsertStep;
