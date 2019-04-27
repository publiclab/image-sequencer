module.exports = {
  getPreviousStep: function() {
    return this.getStep(-1);
  },

  getNextStep: function() {
    return this.getStep(1);
  },

  getInput: function(offset) {
    if (offset + this.getIndex() === 0) offset++;
    return this.getStep(offset - 1).output;
  },

  getOutput: function(offset) {
    return this.getStep(offset).output;
  },

  getOptions: function() {
    return this.getStep(0).options;
  },

  setOptions: function(optionsObj) {
    let options = this.getStep(0).options;
    for (let key in optionsObj) {
      if (options[key]) options[key] = optionsObj[key];
    }
  },

  getFormat: function() {
    return this.getStep(-1).output.format;
  },

  getHeight: function(callback) {
    let img = new Image();
    img.onload = function() {
      callback(img.height);
    };
    img.src = this.getInput(0).src;
  },

  getWidth: function(callback) {
    let img = new Image();
    img.onload = function() {
      callback(img.width);
    };
    img.src = this.getInput(0).src;
  }
};