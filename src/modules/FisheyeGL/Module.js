const pixelManipulation = require('../_nomodule/PixelManipulation');
/*
 * FisheyeGL module
 * Usage:
 *    Expected Inputs:
 *      options.x : x-coordinate of the fisheye effect center | default : 0
 *      options.y : y-coordinate of the fisheye effect center | default : 0
 *      options.radius : radius of the fisheye effect | default : 50% of input image width
 *    Output:
 *      The fisheye effect applied image
 */
module.exports = function FisheyeGLModule(options, UI) {

  // we should get UI to return the image thumbnail so we can attach our own UI extensions
  // add our custom in-module html ui:
  if (options.step.inBrowser && !options.noUI) var ui = require('./Ui.js')(options.step, UI);
  var output,
    setupComplete = false;

  // This function is caled everytime the step has to be redrawn
  function draw(input, callback) {

    var step = this;

    options.step.input = input.src;

    // We should do this via event/listener:
    if (ui && ui.hide) ui.hide();

    function extraManipulation(pixels) {
      const newPixels = require('./FisheyeGL')(pixels, options, function() {
        
        // Start custom UI setup (draggable UI)
        // Only once we have an input image
        if (setupComplete === false && options.step.inBrowser && !options.noUI) {
          setupComplete = true;
          ui.setup();
        }
      });
      return newPixels;
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return pixelManipulation(input, {
      output: output,
      ui: options.step.ui,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback,
      useWasm: options.useWasm
    });
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
