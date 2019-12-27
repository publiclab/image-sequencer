/*
 * Rotates image
 */
module.exports = function Rotate(options, UI) {

  let output;

  function draw(input, callback, progressObj) {

    const defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    options.rotate = options.rotate || defaults.rotate;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    const step = this;

    function changePixel(r, g, b, a) {
      return [r, g, b, a];
    }

    function extraManipulation(pixels) {
      const rotate_value = (options.rotate) % 360;
      radians = (Math.PI) * rotate_value / 180,
      width = pixels.shape[0],
      height = pixels.shape[1],
      cos = Math.cos(radians),
      sin = Math.sin(radians);
      // Final dimensions after rotation

      const finalPixels = require('ndarray')(
        new Uint8Array(
          4 *
          (
            Math.floor(
              Math.abs(width * cos) +
              Math.abs(height * sin) +
              5
            ) *
            (
              Math.floor(
                Math.abs(width * sin) +
                Math.abs(height * cos)
              ) +
              5
            )
          )
        ).fill(255),
        [
          Math.floor(Math.abs(width * cos) + Math.abs(height * sin)) + 5,
          Math.floor(Math.abs(width * sin) + Math.abs(height * cos)) + 4,
          4
        ]
      );

      pixels = require('./Rotate')(pixels, finalPixels, rotate_value, width, height, cos, sin);
      return pixels;
    }
      

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
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
