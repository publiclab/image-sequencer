const Blur = require('../Blur/Blur');
/*
* Detect Edges in an Image
* Uses Canny method for the same
* Read more: https://en.wikipedia.org/wiki/Canny_edge_detector
*/
module.exports = function edgeDetect(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.blur = options.blur || defaults.blur;
  options.highThresholdRatio = options.highThresholdRatio || defaults.highThresholdRatio;
  options.lowThresholdRatio = options.lowThresholdRatio || defaults.lowThresholdRatio;
  options.hysteresis = options.hysteresis || defaults.hysteresis;

  var output;

  // The function which is called on every draw.
  function draw(input, callback, progressObj) {
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    // Makes the image greyscale
    function changePixel(r, g, b, a) {
      return [(r + g + b) / 3, (r + g + b) / 3, (r + g + b) / 3, a];
    }

    // Extra Manipulation function used as an enveloper for applying gaussian blur and Convolution
    function extraManipulation(pixels, setRenderState, generateOutput, frames, f) {
      setRenderState(false);
      const blurPixels = Blur(pixels, options.blur);
      var newPixels = require('./EdgeUtils')(blurPixels, options.highThresholdRatio, options.lowThresholdRatio, options.hysteresis);
      frames[f] = newPixels;
      setRenderState(true);
      generateOutput();
      return newPixels;
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