module.exports = function Segment(options, UI) {
  var defaults = require('../../util/getDefaults.js')(require('./info.json'));
  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;
    options.Segments = options.Segments || defaults.Segments ;

    function extraManipulation(pixels) {
      pixels = require('./Segment.js')(pixels, options.Segments);
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