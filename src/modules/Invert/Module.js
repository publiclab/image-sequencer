const pixelManipulation = require('../_nomodule/PixelManipulation');
/*
 * Invert the image
 */
function Invert(options, UI) {

  var output;

  // The function which is called on every draw.
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {
      return [255 - r, 255 - g, 255 - b, a];
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return pixelManipulation(input, {
      output: output,
      changePixel: changePixel,
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
}
module.exports = Invert;
