module.exports = function DrawRectangle(options, UI) {

  if (options.step.inBrowser && !options.noUI) var ui = require('./Ui.js')(options.step, UI);
  var output,
    setupComplete = false;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {
      return [r, g, b, a];
    }

    function extraManipulation(pixels) {
      pixels = require('./DrawRectangle')(pixels, options, () =>{
        // We should do this via event/listener:
        if (ui && ui.hide) ui.hide();

        // Start custom UI setup (draggable UI)
        // Only once we have an input image
        if (setupComplete === false && options.step.inBrowser && !options.noUI) {
          setupComplete = true;
          ui.setup();
        }
      });
      return pixels;
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
