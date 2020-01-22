
module.exports = function GridOverlay(options, UI) {

  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels, setRenderState, generateOutput) {
      setRenderState(false);
      pixels = require('./GridOverlay')(pixels, options);
      setRenderState(true);
      generateOutput();
      return pixels;
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
      useWasm: options.useWasm
    });


  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
