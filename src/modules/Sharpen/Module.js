/*
  Sharpen an image
*/
module.exports = function Sharpen(options, UI) {

  let defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.sharpenStrength = options.sharpenStrength || defaults.sharpenStrength;
  options.sharpenStrength = parseFloat(options.sharpenStrength); //returns a float
  let output;
  
  function draw(input, callback, progressObj) {
  
    progressObj.stop(true);
    progressObj.overrideFlag = true;
  
    let step = this;
  
    function extraManipulation(pixels) {
      pixels = require('./Sharpen')(pixels, options.sharpenStrength);
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
  