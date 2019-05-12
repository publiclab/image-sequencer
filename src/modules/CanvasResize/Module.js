/*
* Changes the Canvas Size
*/
module.exports = function canvasResize(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  var output;



  function draw(input, callback, progressObj) {

    options.width = options.width || defaults.width;
    options.height = options.height || defaults.height;
    options.x = options.x || defaults.x;
    options.y = options.y || defaults.y;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels) {

      let newPixels = require('ndarray')(new Uint8Array(4 * options.width * options.height).fill(255), [options.width, options.height, 4]);
      let iMax = options.width - options.x,
        jMax = options.height - options.y;
      for (let i = 0; i < iMax && i < pixels.shape[0]; i++) {
        for (let j = 0; j < jMax && j < pixels.shape[1]; j++) {
          let x = i + options.x, y = j + options.y;
          newPixels.set(x, y, 0, pixels.get(i, j, 0));
          newPixels.set(x, y, 1, pixels.get(i, j, 1));
          newPixels.set(x, y, 2, pixels.get(i, j, 2));
          newPixels.set(x, y, 3, pixels.get(i, j, 3));
        }
      }
      return newPixels;
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

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
