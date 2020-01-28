
module.exports = function BlobAnalysis(options, UI){

  var output;
  
  function draw(input, callback, progressObj) {
  
    progressObj.stop(true);
    progressObj.overrideFlag = true;
  
    var step = this;

    function extraManipulation(pixels){
  
      pixels = require('./BlobAnalysis')(pixels);
      return pixels;
    }
  
    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }
  
    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback
    });
  
  }
  
  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
