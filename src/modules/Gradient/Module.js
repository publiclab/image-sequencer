const pixelSetter = require('../../util/pixelSetter.js'),
  pixelManipulation = require('../_nomodule/PixelManipulation');

module.exports = function Gradient(options, UI) {

  var output;

  // The function which is called on every draw.
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    function extraManipulation(pixels) {
      for (var i = 0; i < pixels.shape[0]; i++) {
        for (var j = 0; j < pixels.shape[1]; j++) {
          let val = (i / pixels.shape[0]) * 255;
          pixelSetter(i, j, [val, val, val, 255], pixels);
        }
      }

      return pixels;
    }

    return pixelManipulation(input, {
      output,
      extraManipulation,
      callback,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
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
