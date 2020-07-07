
module.exports = function TextOverlay(options, UI) {

  var output;

  function draw(input, callback) {

    var step = this;

    function extraManipulation(pixels, setRenderState, generateOutput) {
      //if (options.step.inBrowser)
      const getDataUri = require('../../util/getDataUri');
      getDataUri(pixels, input.format).then(dataUri => {
        setRenderState(false);
        pixels = require('./TextOverlay')(pixels, options, dataUri, () => {
          setRenderState(true);
          generateOutput();
        });
      
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
