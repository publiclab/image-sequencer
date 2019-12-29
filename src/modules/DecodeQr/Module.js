const jsQR = require('jsqr');
/*
 * Decodes QR from a given image.
 */
module.exports = function DoNothing(options, UI) {
  let output;

  // This function is called everytime a step has to be redrawn
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    const step = this;

    function extraManipulation(pixels) {
      options.step.qrval = ''; // Reset the option to prevent undefined errors.

      const [width, height] = pixels.shape;

      const decoded = jsQR(pixels.data, width, height);
  
      options.step.qrval = decoded === null ? 'undefined ' : decoded.data;

      return pixels;
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }
    
    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      extraManipulation: extraManipulation,
      ui: options.step.ui,
      format: input.format,
      image: options.image,
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
