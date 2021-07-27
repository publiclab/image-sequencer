/*
* Create Shadow
*/
module.exports = function canvasResize(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  const pixelSetter = require('../../util/pixelSetter.js');

  var output;

  function draw(input, callback, progressObj) {

    options.X_value = parseInt(options.X_value || defaults.X_value);
    options.Y_value = parseInt(options.Y_value || defaults.Y_value);

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels) {
      let [w, h] = pixels.shape;
      let newPixels = require('ndarray')(new Uint8Array(4 * (w + Math.abs(options.X_value)) * (h + Math.abs(options.Y_value))).fill(0), [(w + Math.abs(options.X_value)), (h + Math.abs(options.Y_value)), 4]);
      let iMax = w,
        jMax = h;
      if (options.X_value < 0 && options.Y_value < 0) {
        for (var k = 0; k < Math.abs(options.X_value); k++) {
          for (var l = 0; l < (h + Math.abs(options.Y_value)); l++) {
            let val = 255 - ((k / Math.abs(options.X_value)) * 255);
            pixelSetter(k, l, [val, val, val, 255], newPixels);
          }
        }
        for (var k = 0; k < (w + Math.abs(options.X_value)); k++) {
          for (var l = 0; l < Math.abs(options.Y_value); l++) {
            if (k < Math.abs(options.X_value) && k < l) {
              continue;
            }
            let val = 255 - ((l / Math.abs(options.Y_value)) * 255);
            pixelSetter(k, l, [val, val, val, 255], newPixels);
          }
        }
        for (let i = 0; i < iMax && i < w; i++) {
          for (let j = 0; j < jMax && j < h; j++) {
            let x = i + Math.abs(options.X_value), y = j + Math.abs(options.Y_value);
            pixelSetter(x, y, [pixels.get(i, j, 0), pixels.get(i, j, 1), pixels.get(i, j, 2), pixels.get(i, j, 3)], newPixels);
          }
        }
      }

      else if (options.X_value >= 0 && options.Y_value >= 0) {
        for (var k = w; k < (w + options.X_value); k++) {
          for (var l = 0; l < (h + options.Y_value); l++) {
            let val = (((k - w) / options.X_value) * 255);
            pixelSetter(k, l, [val, val, val, 255], newPixels);
          }
        }
        for (var k = 0; k < (w + options.X_value); k++) {
          for (var l = h; l < (h + options.Y_value); l++) {
            if (k >= w && l >= h && ((k - w) >= (l - h))) {
              continue;
            }
            let val = ((l - h) / options.Y_value * 255);
            pixelSetter(k, l, [val, val, val, 255], newPixels);
          }
        }
        for (let i = 0; i < iMax && i < w; i++) {
          for (let j = 0; j < jMax && j < h; j++) {
            let x = i, y = j;
            pixelSetter(x, y, [pixels.get(i, j, 0), pixels.get(i, j, 1), pixels.get(i, j, 2), pixels.get(i, j, 3)], newPixels);
          }
        }
      }
      
      else if (options.X_value < 0 && options.Y_value >= 0) {
        for (var k = 0; k < (w + Math.abs(options.X_value)); k++) {
          for (var l = h; l < (h + options.Y_value); l++) {
            let val = ((l - h) / options.Y_value * 255);
            pixelSetter(k, l, [val, val, val, 255], newPixels);
          }
        }
        for (var k = 0; k < Math.abs(options.X_value); k++) {
          for (var l = 0; l < (h + options.Y_value); l++) {
            if (l + (k * (options.Y_value / Math.abs(options.X_value))) - (options.Y_value + h) > 0 && l >= h) {
              continue;
            }
            let val = 255 - ((k / Math.abs(options.X_value)) * 255);
            pixelSetter(k, l, [val, val, val, 255], newPixels);
          }
        }
        for (let i = 0; i < iMax && i < w; i++) {
          for (let j = 0; j < jMax && j < h; j++) {
            let x = i + Math.abs(options.X_value), y = j;
            pixelSetter(x, y, [pixels.get(i, j, 0), pixels.get(i, j, 1), pixels.get(i, j, 2), pixels.get(i, j, 3)], newPixels);
          }
        }
      }

      else if (options.X_value >= 0 && options.Y_value < 0) {
        for (var k = w; k < (w + options.X_value); k++) {
          for (var l = 0; l < (h + Math.abs(options.Y_value)); l++) {
            let val = (((k - w) / options.X_value) * 255);
            pixelSetter(k, l, [val, val, val, 255], newPixels);
          }
        }
        for (var k = 0; k < (w + options.X_value); k++) {
          for (var l = 0; l < Math.abs(options.Y_value); l++) {
            if (l >= ((options.X_value / Math.abs(options.Y_value)) * (w + options.X_value - k)) && k >= w) {
              continue;
            }
            let val = 255 - (l / Math.abs(options.Y_value) * 255);
            pixelSetter(k, l, [val, val, val, 255], newPixels);
          }
        }
        for (let i = 0; i < iMax && i < w; i++) {
          for (let j = 0; j < jMax && j < h; j++) {
            let x = i, y = j + Math.abs(options.Y_value);
            pixelSetter(x, y, [pixels.get(i, j, 0), pixels.get(i, j, 1), pixels.get(i, j, 2), pixels.get(i, j, 3)], newPixels);
          }
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