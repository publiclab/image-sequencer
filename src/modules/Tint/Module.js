module.exports = function Tint(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  var output;

  function draw(input, callback, progressObj) {

    var color = options.color || defaults.color;
    color = color.split(' ');
    var factor = options.factor || defaults.factor;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {

      r -= (r - color[0]) * factor;
      g -= (g - color[1]) * factor;
      b -= (b - color[2]) * factor;
      return [r, g, b, a];
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      changePixel: changePixel,
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
