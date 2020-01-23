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

    function extraManipulation(pixels, setRenderState, generateOutput) {
      setRenderState(false);
      const oldPixels = _.cloneDeep(pixels);
      var newPixels = require('./flipImage')(oldPixels, pixels, options.Axis);
      setRenderState(true);
      generateOutput();
      return newPixels;
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
