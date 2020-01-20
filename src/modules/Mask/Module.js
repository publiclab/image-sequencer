module.exports = function Mask(options, UI, util) {
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.offset = options.offset || defaults.offset;
  options.resize = options.resize || defaults.resize;

  var output;

  // This function is called on every draw.
  function draw(input, callback, progressObj) {
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    var getPixels = require('get-pixels');

    // convert offset as string to int
    if (typeof options.offset === 'string')
      options.offset = parseInt(options.offset);

    // save first image's pixels
    var priorStep = this.getStep(options.offset);

    if (priorStep.output === undefined) {
      this.output = input;
      UI.notify('Offset Unavailable', 'offset-notification');
      callback();
    }

    const alpha_masking = function(c, a) {
      return (a * c + (255 - a) * c) / 255;
    };
    const internalSequencer = ImageSequencer({ inBrowser: false, ui: false });
    internalSequencer.loadImage(priorStep.output.src, function() {
      internalSequencer.importJSON([{ 'name': 'resize', 'options': { resize: options.resize } }]);
      internalSequencer.run(function onCallback(internalOutput) {

        getPixels(internalOutput, function(err, pixels) {
          options.firstImagePixels = pixels;

          function changePixel(r2, g2, b2, a2, x, y) {
            let p = options.firstImagePixels;
            let r1 = p.get(x, y, 0),
              g1 = p.get(x, y, 1),
              b1 = p.get(x, y, 2),
              a1 = p.get(x, y, 3);

            return [alpha_masking(r1, a2), alpha_masking(g1, a2), alpha_masking(b1, a2)];
          }

          function output(image, datauri, mimetype, wasmSuccess) {
            step.output = {
              src: datauri,
              format: mimetype,
              wasmSuccess,
              useWasm: options.useWasm
            };
          }

          // run PixelManipulatin on second image's pixels
          return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
            ui: options.step.ui,
            changePixel: changePixel,
            format: input.format,
            image: options.image,
            inBrowser: options.inBrowser,
            callback: callback,
            useWasm: options.useWasm
          });
        });
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
