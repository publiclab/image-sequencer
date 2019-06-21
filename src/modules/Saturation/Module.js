/*
 * Saturate an image with a value from 0 to 1
 */
module.exports = function Saturation(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  var output;

  function draw(input, callback, progressObj) {

    options.saturation = options.saturation || defaults.saturation;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    var cR = 0.299;
    var cG = 0.587;
    var cB = 0.114;

    function changePixel(r, g, b, a) {

      var p = Math.sqrt((cR * (r * r)) + (cG * (g * g)) + (cB * (g * g)));

      r = p + (r - p) * (options.saturation);
      g = p + (g - p) * (options.saturation);
      b = p + (b - p) * (options.saturation);


      return [Math.round(r), Math.round(g), Math.round(b), a];
    }

    function output(image, datauri, mimetype) {

      // This output is accesible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback,
      useWasm:options.useWasm
    });

  }

  return {
    options: options,
    //setup: setup, // optional
    draw: draw,
    output: output,
    UI: UI
  };
};
