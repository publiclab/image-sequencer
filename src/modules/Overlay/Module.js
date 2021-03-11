module.exports = function Dynamic(options, UI, util) {

  const defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;

  if(options.step.inBrowser && !options.noUI && sequencer.getSteps().length < 2)
    options.offset = -1;

  let ui;

  if (options.step.inBrowser && !options.noUI)  ui = require('./Ui.js')(options.step, UI);

  let output;

  // This function is called on every draw.
  function draw(input, callback, progressObj) {

    options.offset = parseInt(options.offset || defaults.offset);

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    const step = this;

    const parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');

    // save the pixels of the base image
    const baseStepImage = this.getStep(options.offset).image;
    const baseStepOutput = this.getOutput(options.offset);

    const getPixels = require('get-pixels');

    getPixels(input.src, function(err, pixels) {
      // parse the inputs
      parseCornerCoordinateInputs({
        iw: pixels.shape[0],
        ih: pixels.shape[1]
      },
      {
        x: { valInp: options.x, type: 'horizontal' },
        y: { valInp: options.y, type: 'vertical' },
      }, function(opt, input) {
        options.x = parseInt(input.x.valInp);
        options.y = parseInt(input.y.valInp);
      });

      options.secondImagePixels = pixels;

      function changePixel(r1, g1, b1, a1, x, y) {

        const firstImagePixels = [r1, g1, b1, a1];

        // overlay
        const p = options.secondImagePixels;
        if (x >= options.x
          && x - options.x < p.shape[0]
          && y >= options.y
          && y - options.y < p.shape[1]){

          const secondImagePixels = [
            p.get(x - options.x, y - options.y, 0),
            p.get(x - options.x, y - options.y, 1),
            p.get(x - options.x, y - options.y, 2),
            p.get(x - options.x, y - options.y, 3)
          ];
          
          if(secondImagePixels[3] === 0)
            return firstImagePixels;
          else
            return secondImagePixels;
        }
        else
          return firstImagePixels;
      }

      function output(image, datauri, mimetype, wasmSuccess) {
        step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
      }

      function modifiedCallback() {
        if (options.step.inBrowser && !options.noUI) {
          ui.setup();
        }
        callback();
      }

      // run PixelManipulation on first Image pixels
      return require('../_nomodule/PixelManipulation.js')(baseStepOutput, {
        output: output,
        ui: options.step.ui,
        changePixel: changePixel,
        format: baseStepOutput.format,
        image: baseStepImage,
        inBrowser: options.inBrowser,
        callback: modifiedCallback,
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
