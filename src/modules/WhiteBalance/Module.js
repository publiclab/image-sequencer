module.exports = function Balance(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.red = options.red || defaults.red;
  options.green = options.green || defaults.green;
  options.blue = options.blue || defaults.blue;

  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels) {

      var i = 0;
      var red_factor = 255 / options.red;
      var green_factor = 255 / options.green;
      var blue_factor = 255 / options.blue;

      while (i < pixels.data.length) {
        pixels.data[i] = Math.min(255, pixels.data[i] * red_factor);
        pixels.data[i + 1] = Math.min(255, pixels.data[i + 1] * green_factor);
        pixels.data[i + 2] = Math.min(255, pixels.data[i + 2] * blue_factor);
        i += 4;
      }

      return pixels;
    }

    function output(image, datauri, mimetype) {

      step.output = { src: datauri, format: mimetype };

    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
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