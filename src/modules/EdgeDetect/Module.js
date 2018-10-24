/*
* Detect Edges in an Image
*/
module.exports = function edgeDetect(options, UI) {

  options.blur = options.blur || 2;
  options.highThresholdRatio = options.highThresholdRatio || 0.2;
  options.lowThresholdRatio = options.lowThresholdRatio || 0.15;

  var output;

  // The function which is called on every draw.
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;


    //   Extra Manipulation function used as an enveloper for applying gaussian blur and Convolution
    function extraManipulation(pixels) {
      pixels = require('ndarray-gaussian-filter')(pixels, options.blur);
      pixels = require('./EdgeUtils')(pixels, options.highThresholdRatio, options.lowThresholdRatio, options.inBrowser);
      return pixels;
    }

    function changePixel(r, g, b, a) {
      return [(r + g + b) / 3, (r + g + b) / 3, (r + g + b) / 3, a];
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      changePixel: changePixel,
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
  }
}
