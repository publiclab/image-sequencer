var sequencer = [];
var module = {
  exports: {},
  set exports(val){
    sequencer.push(val);
  }
};
