/*
 * NDVI with red filter (blue channel is infrared)
 */
module.exports = function Ndvi(options, UI) {

  if (options.step.inBrowser) var ui = require('./Ui.js')(options.step, UI);

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.filter = options.filter || defaults.filter;

  var output;

  // The function which is called on every draw.
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {
      if (options.filter == 'red') var ndvi = (b - r) / (1.00 * b + r);
      if (options.filter == 'blue') var ndvi = (r - b) / (1.00 * b + r);
      var x = 255 * (ndvi + 1) / 2;
      return [x, x, x, a];
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

    }

    function modifiedCallback() {
      if (options.step.inBrowser) {
        ui.setup();
      }
      callback();
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: modifiedCallback,
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
