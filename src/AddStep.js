function AddStep(ref, image, name, o) {

  function addStep(image, name, o_) {
    var o = ref.copy(o_);
    o.number = ref.options.sequencerCounter++; //Gives a Unique ID to each step
    o.name = o_.name || name;
    o.selector = o_.selector || 'ismod-' + name;
    o.container = o_.container || ref.options.selector;
    o.image = image;

    var metadata = ref.images[image].metadata;
    if(!metadata.hasOwnProperty(name)) {
      metadata[name] = [];
      metadata[name].last = function() {
        return this[this.length-1];
      }
    }
    metadata[name].push({});
    o.metadata = metadata[name].last();

    var UI = ref.UI({
      stepName: o.name,
      stepID: o.number,
      imageName: o.image
    });
    var module = ref.modules[name](o,UI);
    ref.images[image].steps.push(module);

    return true;
  }

  addStep(image, name, o);
}
module.exports = AddStep;
