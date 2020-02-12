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

      pixels = require('./MotionBlur')(pixels, finalPixels, rotate_value, width, height, cos, sin);

      const new_rotate_value = 360 - ((options.rotate) % 360);
      new_radians = (Math.PI) * new_rotate_value / 180,
      new_width = Math.floor(Math.abs(width * cos) + Math.abs(height * sin) + 5),
      new_height = Math.floor(Math.abs(width * sin) + Math.abs(height * cos)) + 5,
      new_cos = Math.cos(new_radians),
      new_sin = Math.sin(new_radians);

      const new_finalPixels = require('ndarray')(
        new Uint8Array(
          4 *
          (
            Math.floor(
              Math.abs(new_width * new_cos) +
              Math.abs(new_height * new_sin) +
              5
            ) *
            (
              Math.floor(
                Math.abs(new_width * new_sin) +
                Math.abs(new_height * new_cos)
              ) +
              5
            )
          )
        ).fill(255),
        [
          Math.floor(Math.abs(new_width * new_cos) + Math.abs(new_height * new_sin)) + 5,
          Math.floor(Math.abs(new_width * new_sin) + Math.abs(new_height * new_cos)) + 4,
          4
        ]
      );

      new_pixels = require('./MotionBlur')(finalPixels, new_finalPixels, new_rotate_value, new_width, new_height, new_cos, new_sin);
      return new_pixels;
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
