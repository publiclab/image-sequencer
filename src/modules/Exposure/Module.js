/*
* Changes the Image Exposure
*/

module.exports = function Exposure(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  var output;

  function draw(input, callback, progressObj) {

    options.exposure = options.exposure || defaults.exposure;
    var exposure = Math.pow(2, options.exposure);
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {

      r = Math.min(255, r * exposure);
      g = Math.min(255, g * exposure);
      b = Math.min(255, b * exposure);
      return [r, g, b, a];
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback
    });

  }
  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
