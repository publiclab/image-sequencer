module.exports = function Gamma(options, UI) {

  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    var defaults = require('./../../util/getDefaults.js')(require('./info.json')),
      adjustment = options.adjustment || defaults.adjustment;
    var val = adjustment / defaults.adjustment;

    function changePixel(r, g, b, a) {

      r = Math.pow(r / 255, val) * 255;
      g = Math.pow(g / 255, val) * 255;
      b = Math.pow(b / 255, val) * 255;

      return [r, g, b, a];
    }

    function output(image, datauri, mimetype) {

      step.output = { src: datauri, format: mimetype };

    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
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
};
