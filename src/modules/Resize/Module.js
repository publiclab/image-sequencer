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
      return require('./Resize')(pixels, options);
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
