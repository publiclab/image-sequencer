/*
 * Saturate an image
 */
module.exports = function Saturation(options,UI) {

  options = options || {};
  options.title = "Saturation";
  options.description = "Saturate an image";

  // Tell UI that a step has been set up
  UI.onSetup(options.step);
  var output;

  function draw(input,callback) {

    // Tell UI that a step is being drawn
    UI.onDraw(options.step);
    var step = this;

    function changePixel(r, g, b, a) {

      var cR = 0.299;
      var cG = 0.587;
      var cB = 0.114;

      var p = Math.sqrt((cR * (r*r)) + (cG * (g*g)) + (cB * (g*g)));

      r = p+(r-p)*(options.saturation);
      g = p+(g-p)*(options.saturation);
      b = p+(b-p)*(options.saturation);


      return [Math.round(r), Math.round(g), Math.round(b), a];
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
