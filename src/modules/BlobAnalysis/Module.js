
module.exports = function BlobAnalysis(options, UI){

  var output;
  
  function draw(input, callback, progressObj) {
  
    progressObj.stop(true);
    progressObj.overrideFlag = true;
  
    var step = this;

    function extraManipulation(pixels, setRenderState, generateOutput){
      setRenderState(false);
      if (!options.inBrowser) {
        require('../_nomodule/gl-context')(input, callback, step, options);
      } else{
        pixels = require('./BlobAnalysis')(pixels);
        setRenderState(true);
        generateOutput();
      }
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
