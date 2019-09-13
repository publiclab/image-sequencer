/*
 * Rotates image
 */
module.exports = function Rotate(options, UI) {

  var output;

  function draw(input, callback, progressObj) {

    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    options.rotate = options.rotate || defaults.rotate;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    var imagejs = require('imagejs');

    function changePixel(r, g, b, a) {
      return [r, g, b, a];
    }

    function extraManipulation(pixels) {
      var rotate_value = (options.rotate) % 360;
      var radians = (Math.PI) * rotate_value / 180;
      var width = pixels.shape[0];
      var height = pixels.shape[1];
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      //final dimensions after rotation
      var pixels2 = require('ndarray')(new Uint8Array(4 * (Math.floor(Math.abs(width * cos) + Math.abs(height * sin) + 5) * (Math.floor(Math.abs(width * sin) + Math.abs(height * cos)) + 5))).fill(0), [Math.floor(Math.abs(width * cos) + Math.abs(height * sin)) + 5, Math.floor(Math.abs(width * sin) + Math.abs(height * cos)) + 4, 4]);
      pixels = require('./Rotate')(pixels, pixels2, options, rotate_value, width, height, cos, sin);
      return pixels;
    }
      

    function output(image, datauri, mimetype) {
      // This output is accesible by Image Sequencer
      step.output = { src: datauri, format: mimetype };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback,
      useWasm:options.useWasm
    });
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
