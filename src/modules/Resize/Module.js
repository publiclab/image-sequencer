const imagejs = require('imagejs'),
  pixelSetter = require('../../util/pixelSetter'),
  ndarray = require('ndarray');
/*
 * Resize the image by given percentage value
 */
module.exports = function Resize(options, UI) {

  let output;

  function draw(input, callback, progressObj) {

    const defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    options.resize = options.resize || defaults.resize;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    const step = this;

    function extraManipulation(pixels) {
      // Value above 100% scales up, and below 100% scales down
      const resize_value = parseInt(options.resize.slice(0, -1));

      if (resize_value == 100) return pixels;


      const new_width = Math.round(pixels.shape[0] * (resize_value / 100)),
        new_height = Math.round(pixels.shape[1] * (resize_value / 100));

      const bitmap = new imagejs.Bitmap({ width: pixels.shape[0], height: pixels.shape[1] });
      
      for (let x = 0; x < pixels.shape[0]; x++) {
        for (let y = 0; y < pixels.shape[1]; y++) {
          let r = pixels.get(x, y, 0),
            g = pixels.get(x, y, 1),
            b = pixels.get(x, y, 2),
            a = pixels.get(x, y, 3);

          bitmap.setPixel(x, y, r, g, b, a);
        }
      }

      const resized = bitmap.resize({
        width: new_width,
        height: new_height,
        algorithm: 'bicubicInterpolation'
      });

      const newPix = new ndarray([], [new_width, new_height, 4]);

      for (let x = 0; x < new_width; x++) {
        for (let y = 0; y < new_height; y++) {
          const {r, g, b, a} = resized.getPixel(x, y);
          pixelSetter(x, y, [r, g, b, a], newPix);
        }
      }

      return newPix;
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
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
