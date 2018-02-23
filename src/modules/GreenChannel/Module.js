/*
 * Display only the green channel
 */
module.exports = function GreenChannel(options,UI) {

  options = options || {};
  options.title = "Green channel only";
  options.description = "Displays only the green channel of an image";

  // Tell UI that a step has been set up
  UI.onSetup(options.step);
  var output;

  function draw(input,callback) {

    // Tell UI that a step is being drawn
    UI.onDraw(options.step);
    var step = this;

    function changePixel(r, g, b, a) {
      return [0, g, 0, a];
    }

    function output(image,datauri,mimetype){

      // This output is accesible by Image Sequencer
      step.output = {src:datauri,format:mimetype};

      // This output is accessible by UI
      options.step.output = datauri;

      // Tell UI that step ahs been drawn
      UI.onComplete(options.step);
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback
    });

  }

  return {
    options: options,
    //setup: setup, // optional
    draw:  draw,
    output: output,
    UI: UI
  }
}
