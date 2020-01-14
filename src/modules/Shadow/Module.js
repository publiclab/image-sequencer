/*
* Create Shadow
*/
module.exports = function canvasResize(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  const pixelSetter = require('../../util/pixelSetter.js');

  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels) {
      let [w, h] = pixels.shape;
      let newPixels = require('ndarray')(new Uint8Array(4 * (w + 20) * (h + 20)).fill(0), [(w + 20), (h + 20), 4]);
      let iMax = w,
        jMax = h;
      for (var k = 0; k < 20; k++) {
        for (var l = 0; l < (h + 20); l++) {
          let val = 255 - ((k / 20) * 255);
          pixelSetter(k, l, [val, val, val, 255], newPixels);
        }
      }
      for (var k = 0; k < (w + 20); k++) {
        for (var l = 0; l < 20; l++) {
          if (k < 20 && k < l) {
            continue;
          }
          let val = 255 - ((l / 20) * 255);
          pixelSetter(k, l, [val, val, val, 255], newPixels);
        }
      }
      for (let i = 0; i < iMax && i < w; i++) {
        for (let j = 0; j < jMax && j < h; j++) {
          let x = i + 20, y = j + 20;
          pixelSetter(x, y, [pixels.get(i, j, 0), pixels.get(i, j, 1), pixels.get(i, j, 2), pixels.get(i, j, 3)], newPixels);
        }
      }
      return newPixels;
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
