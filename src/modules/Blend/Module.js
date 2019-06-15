module.exports = function Dynamic(options, UI, util) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.func = options.func || defaults.blend;
  options.offset = options.offset || defaults.offset;

  var output;

  // This function is called on every draw.
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    // convert to runnable code:
    if (typeof options.func === 'string') eval('options.func = ' + options.func);

    var getPixels = require('get-pixels');

    // convert offset as string to int
    if (typeof options.offset === 'string') options.offset = parseInt(options.offset);

    // save first image's pixels
    var priorStep = this.getStep(options.offset);

    if (priorStep.output === undefined) {
      this.output = input;
      UI.notify('Offset Unavailable', 'offset-notification');
      callback();
    }

    getPixels(priorStep.output.src, function(err, pixels) {
      options.firstImagePixels = pixels;

      function changePixel(r2, g2, b2, a2, x, y) {
        // blend!
        let p = options.firstImagePixels;
        return options.func(
          r2, g2, b2, a2,
          p.get(x, y, 0),
          p.get(x, y, 1),
          p.get(x, y, 2),
          p.get(x, y, 3)
        );
      }

      function output(image, datauri, mimetype) {

        // This output is accessible by Image Sequencer
        step.output = { src: datauri, format: mimetype };

      }

      // run PixelManipulatin on second image's pixels
      return require('../_nomodule/PixelManipulation.js')(input, {
        output: output,
        ui: options.step.ui,
        changePixel: changePixel,
        format: input.format,
        image: options.image,
        inBrowser: options.inBrowser,
        callback: callback
      });
    });
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
