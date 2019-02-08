// add steps to the sequencer
function AddStep(_sequencer, image, name, o) {
  return require('./InsertStep')(_sequencer,image,-1,name,o);
}
module.exports = AddStep;
