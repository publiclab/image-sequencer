/*
* Changes the Canvas Size
*/
module.exports = function canvasResize(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  const pixelSetter = require('../../util/pixelSetter.js');

  var output;

  function draw(input, callback, progressObj) {

    options.width = parseInt(options.width || defaults.width);
    options.height = parseInt(options.height || defaults.height);
    options.x = parseInt(options.x || defaults.x);
    options.y = parseInt(options.y || defaults.y);

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels) {

      let newPixels = require('ndarray')(new Uint8Array(4 * options.width * options.height).fill(0), [options.width, options.height, 4]);
      let iMax = options.width - options.x,
        jMax = options.height - options.y;
      for (let i = 0; i < iMax && i < pixels.shape[0]; i++) {
        for (let j = 0; j < jMax && j < pixels.shape[1]; j++) {
          let x = i + options.x, y = j + options.y;
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
