const pixelSetter = require('../../util/pixelSetter.js'),
  pixelManipulation = require('../_nomodule/PixelManipulation');

module.exports = function Gradient(options, UI) {

  var output;

  // The function which is called on every draw.
  function draw(input, callback) {
    var step = this;

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    function extraManipulation(pixels) {
      const [w, h] = pixels.shape;
      for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
          let val = (i / w) * 255;
          
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
