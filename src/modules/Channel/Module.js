/*
 * Display only one color channel
 */
module.exports = function Channel(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.channel = options.channel || defaults.channel;

  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {
      if (options.channel === 'red') return [r, 0, 0, a];
      if (options.channel === 'green') return [0, g, 0, a];
      if (options.channel === 'blue') return [0, 0, b, a];
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback,
      useWasm:options.useWasm
    });

  }

  return {
    options: options,
    //setup: setup, // optional
    draw: draw,
    output: output,
    UI: UI
  };
};
