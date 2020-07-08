const _ = require('lodash'),
  parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');
module.exports = function AddQR(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  var output;
  getPixels = require('get-pixels');

  function draw(input, callback, progressObj) {

    options.size = Number(options.size || defaults.size);
    options.qrCodeString = options.qrCodeString || defaults.qrCodeString;
    options.startingX = options.startingX || defaults.startingX;
    options.startingY = options.startingY || defaults.startingY;
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels, setRenderState, generateOutput) {
      let iw = pixels.shape[0], // Width of Original Image
        ih = pixels.shape[1]; // Height of Original Image
      const oldPixels = _.cloneDeep(pixels);
      setRenderState(false); // Prevent rendering of final output image until extraManipulation completes.

      // Parse the inputs.
      parseCornerCoordinateInputs({iw, ih},
        {
          startingX: { valInp: options.startingX, type: 'horizontal'},
          startingY: { valInp: options.startingY, type: 'vertical' },
        }, function(opt, cord){
          options.startingX = Math.floor(cord.startingX.valInp);
          options.startingY = Math.floor(cord.startingY.valInp);
        });

      require('./QR')(options, pixels, oldPixels, () => {
        setRenderState(true); // Allow rendering in the callback.
        generateOutput();
      });
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