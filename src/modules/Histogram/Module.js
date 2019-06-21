/*
 * Calculates the histogram of the image
 */
module.exports = function Channel(options, UI) {

  var output;

  function draw(input, callback, progressObj) {

    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    options.gradient = options.gradient || defaults.gradient;
    options.gradient = JSON.parse(options.gradient);

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this, hist = new Array(256).fill(0);

    function changePixel(r, g, b, a) {
      let pixVal = Math.round((r + g + b) / 3);
      hist[pixVal]++;
      return [r, g, b, a];
    }

    function extraManipulation(pixels) {
      // if (!options.inBrowser)
      //     require('fs').writeFileSync('./output/histo.txt', hist.reduce((tot, cur, idx) => `${tot}\n${idx} : ${cur}`, ``));
      var newarray = new Uint8Array(4 * 256 * 256);
      pixels.data = newarray;
      pixels.shape = [256, 256, 4];
      pixels.stride[1] = 4 * 256;

      for (let x = 0; x < 256; x++) {
        for (let y = 0; y < 256; y++) {
          pixels.set(x, y, 0, 255);
          pixels.set(x, y, 1, 255);
          pixels.set(x, y, 2, 255);
          pixels.set(x, y, 3, 255);
        }
      }

      let startY = options.gradient ? 10 : 0;
      if (options.gradient) {
        for (let x = 0; x < 256; x++) {
          for (let y = 0; y < 10; y++) {
            pixels.set(x, 255 - y, 0, x);
            pixels.set(x, 255 - y, 1, x);
            pixels.set(x, 255 - y, 2, x);
          }
        }
      }

      let convfactor = (256 - startY) / Math.max(...hist);

      for (let x = 0; x < 256; x++) {
        let pixCount = Math.round(convfactor * hist[x]);

        for (let y = startY; y < pixCount; y++) {
          pixels.set(x, 255 - y, 0, 204);
          pixels.set(x, 255 - y, 1, 255);
          pixels.set(x, 255 - y, 2, 153);
        }
      }

      return pixels;
    }

    function output(image, datauri, mimetype) {

      // This output is accesible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

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
      useWasm:options.useWasm
    });

  }

  return {
    options: options,
    //setup: setup, // optional
    draw: draw,
    output: output,
    UI: UI
  };
};
