/*
  Sharpen an image
*/
module.exports = function Sharpen(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.sharpen = options.sharpen || defaults.sharpen;
  options.sharpen = parseFloat(options.sharpen); //returns a float
  var output;
  
  function draw(input, callback, progressObj) {
  
    progressObj.stop(true);
    progressObj.overrideFlag = true;
  
    var step = this;
  
    function extraManipulation(pixels) {
      pixels = require('./Sharpen')(pixels, options.sharpen);
      return (pixels);
    }
  
    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }
  
    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      inBrowser: options.inBrowser,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
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
  