const pixelManipulation = require('../_nomodule/PixelManipulation'),
  parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');
/*
 * Image Cropping module
 * Usage:
 *    Expected Inputs:
 *      options.x : x-coordinate of image where the modules starts cropping | default : 0
 *      options.y : y-coordinate of image where the modules starts cropping | default : 0
 *      options.w : width of the resulting cropped image | default : 50% of input image width
 *      options.h : height of the resulting cropped image | default : 50% of input image height
 *    Output:
 *      The cropped image, which is essentially a rectangle bounded by the lines:
 *          x = options.x
 *          x = options.x + options.w
 *          y = options.y
 *          y = options.y + options.h
 */
module.exports = function CropModule(options, UI) {

  // we should get UI to return the image thumbnail so we can attach our own UI extensions
  // add our custom in-module html ui:
  if (options.step.inBrowser && !options.noUI) var ui = require('./Ui.js')(options.step, UI);
  var output,
    setupComplete = false;

  // This function is caled everytime the step has to be redrawn
  function draw(input, callback) {

    var step = this;

    // Parse the inputs
    parseCornerCoordinateInputs(options, {
      src: input.src,
      x: { valInp: options.x, type: 'horizontal' },
      y: { valInp: options.y, type: 'vertical' },
      w: { valInp: options.w, type: 'horizontal' },
      h: { valInp: options.h, type: 'vertical' },
    }, function (options, coord) {
      options.x = parseInt(coord.x.valInp);
      options.y = parseInt(coord.y.valInp);
      options.w = coord.w.valInp;
      options.h = coord.h.valInp;
    });

    function extraManipulation(pixels) {
      pixels = require('./Crop')(pixels, options);
      return pixels;
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
      callback: function() {
        // Tell the UI that the step has been drawn
        UI.onComplete(options.step);

        // We should do this via event/listener:
        if (ui && ui.hide) ui.hide();

        // Start custom UI setup (draggable UI)
        // Only once we have an input image
        if (setupComplete === false && options.step.inBrowser && !options.noUI) {
          setupComplete = true;
          ui.setup();
        }
      },
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
