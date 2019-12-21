module.exports = function Dynamic(options, UI, util) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;

  var output;

  // This function is called on every draw.
  function draw(input, callback, progressObj) {

    options.offset = parseInt(options.offset) || -2;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    var parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');

    //parse the inputs
    parseCornerCoordinateInputs(options, {
      src: input.src,
      x: { valInp: options.x, type: 'horizontal' },
      y: { valInp: options.y, type: 'vertical' },
    }, function(options, input) {
      options.x = parseInt(input.x.valInp);
      options.y = parseInt(input.y.valInp);
    });

    // save the pixels of the base image
    var baseStepImage = this.getStep(options.offset).image;
    var baseStepOutput = this.getOutput(options.offset);

    var getPixels = require('get-pixels');

    getPixels(input.src, function(err, pixels) {
      options.secondImagePixels = pixels;

      function changePixel(r1, g1, b1, a1, x, y) {

        // overlay
        var p = options.secondImagePixels;
        if (x >= options.x
          && x - options.x < p.shape[0]
          && y >= options.y
          && y - options.y < p.shape[1])
          return [
            p.get(x - options.x, y - options.y, 0),
            p.get(x - options.x, y - options.y, 1),
            p.get(x - options.x, y - options.y, 2),
            p.get(x - options.x, y - options.y, 3)
          ];
        else
          return [r1, g1, b1, a1];
      }

      function output(image, datauri, mimetype, wasmSuccess) {
        step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
      }

      // run PixelManipulation on first Image pixels
      return require('../_nomodule/PixelManipulation.js')(baseStepOutput, {
        output: output,
        ui: options.step.ui,
        changePixel: changePixel,
        format: baseStepOutput.format,
        image: baseStepImage,
        inBrowser: options.inBrowser,
        callback: callback,
        useWasm:options.useWasm
      });
    });
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
