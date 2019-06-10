module.exports = function Dynamic(options, UI, util) {
  // Tests for functions that are available inside modules only

  var output;

  // This function is called on every draw.
  function draw(input, callback) {

    var step = this;

    if (this.getPreviousStep().options.name != 'invert') throw new Error('getPreviousStep not working');
    if (this.getNextStep().options.name != 'invert') throw new Error('getNextStep not working');
    if (this.getInput(0) != this.getOutput(-1)) throw new Error('getInput and getOuput now working');
    if (this.getFormat() != 'jpeg') throw new Error('getFormat not working');
    if (this.getOptions().name != 'test') throw new Error('getOptions not working');
    this.setOptions({ name: 'test-1' });
    if (this.getOptions().name != 'test-1') throw new Error('setOptions not working not working');
    this.getHeight(((h) => { if (h != 16) throw new Error('getHeight not working'); }));
    this.getWidth((w) => { if (w != 16) throw new Error('getWidth not working'); });

    function output(image, datauri, mimetype) {
      step.output = input;
    }

  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};