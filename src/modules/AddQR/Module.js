const _ = require('lodash');
module.exports = function AddQR(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.size = options.size || defaults.size;
  options.qrCodeString = options.qrCodeString || 'https://github.com/publiclab/image-sequencer';
  var output;
  getPixels = require('get-pixels');

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {
      return [r, g, b, a];
    }

    function extraManipulation(pixels, setRenderState, generateOutput) {
      const oldPixels = _.cloneDeep(pixels);
      setRenderState(false);

      require('./QR')(options, pixels, oldPixels, () => {
        setRenderState(true);
        generateOutput();
      });
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