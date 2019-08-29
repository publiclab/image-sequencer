// add steps to the sequencer
function AddStep(_sequencer, name, o) {
  return require('./InsertStep')(_sequencer, -1, name, o);
}
module.exports = AddStep;
