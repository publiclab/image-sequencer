// /*
// * Changes the Image Contrast
// */

module.exports = function Contrast(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.contrast = options.contrast || defaults.contrast;
  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels) {
      pixels = require('./Contrast')(pixels, options.contrast);
      return pixels;
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

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
