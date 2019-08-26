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
      var radians = 3.141592653589793 * rotate_value / 180;
      var width = pixels.shape[0];
      var height = pixels.shape[1];
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      var height_half = Math.floor(height / 2);
      var width_half = Math.floor(width / 2);
      var dimension = width + height;

      if (rotate_value % 360 == 0)
        return pixels;


      function copyPixel(x1, y1, x2, y2){
        pixels1.set(x1, y1, 0, pixels.get(x2, y2, 0));
        pixels1.set(x1, y1, 1, pixels.get(x2, y2, 1));
        pixels1.set(x1, y1, 2, pixels.get(x2, y2, 2));
        pixels1.set(x1, y1, 3, pixels.get(x2, y2, 3));
      }

      function copyPixel2(x1, y1, x2, y2){
        pixels2.set(x1, y1, 0, pixels1.get(x2, y2, 0));
        pixels2.set(x1, y1, 1, pixels1.get(x2, y2, 1));
        pixels2.set(x1, y1, 2, pixels1.get(x2, y2, 2));
        pixels2.set(x1, y1, 3, pixels1.get(x2, y2, 3));
      }


      
      pixels1 = require('ndarray')(new Uint8Array(4 * dimension * dimension).fill(0), [dimension, dimension, 4]);
        
      for (var n = 0; n < pixels.shape[0]; n++){
        for (var m = 0; m < pixels.shape[1]; m++){
          copyPixel(n + height_half, m + width_half, n, m);
        }
      }

      var bitmap = new imagejs.Bitmap({ width: pixels1.shape[0], height: pixels1.shape[1] });
      bitmap._data.data = pixels1.data;

      var rotated = bitmap.rotate({
        degrees: rotate_value,
      });

      pixels1.data = rotated._data.data;
      var pixels2 = require('ndarray')(new Uint8Array(4 * (Math.floor(Math.abs(width * cos) + Math.abs(height * sin) + 5) * (Math.floor(Math.abs(width * sin) + Math.abs(height * cos)) + 5))).fill(0), [Math.floor(Math.abs(width * cos) + Math.abs(height * sin)) + 5, Math.floor(Math.abs(width * sin) + Math.abs(height * cos)) + 4, 4]);
      for (var n = 0; n < pixels2.shape[0]; n++){
        for (var m = 0; m < pixels2.shape[1]; m++){
          copyPixel2(n, m, n + Math.floor(dimension / 2 -  Math.abs(width * cos / 2) - Math.abs(height * sin / 2)) - 1, m + Math.floor(dimension / 2 - Math.abs(height * cos / 2) - Math.abs(width * sin / 2)) - 1);
        }
      }
      return pixels2;
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
