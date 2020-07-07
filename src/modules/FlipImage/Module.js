const _ = require('lodash');
/*
 * Flip the image on vertical/horizontal axis.
 */
module.exports = function FlipImage(options, UI) {
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.Axis = options.Axis || defaults.Axis;

  let output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {
      return [r, g, b, a];
    }
    function extraManipulation(pixels) {
      const oldPixels = _.cloneDeep(pixels);

      return require('./flipImage')(oldPixels, pixels, options.Axis);
    }
    
    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
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
