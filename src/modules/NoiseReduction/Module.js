module.exports = function NoiseReduction(options, UI){
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  var output;
  
  function draw(input,callback,progressObj){
  
    progressObj.stop(true);
    progressObj.overrideFlag = true;
  
    var step = this;
    options.method = options.method || defaults.method;

    function changePixel(r, g, b, a){
      return [r, g, b, a];
    }
  
    function extraManipulation(pixels) {
      pixels = require('./NoiseReduction.js')(pixels, options.method);
      return pixels;
    }
  
    function output(image,  datauri, mimetype){
      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };
  
    }
  
    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      changePixel: changePixel,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
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