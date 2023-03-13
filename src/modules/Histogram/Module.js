/*
 * Calculates the histogram of the image
 */
module.exports = function Channel(options, UI) {

  var output;

  function draw(input, callback, progressObj) {

    const defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    const pixelSetter = require('../../util/pixelSetter.js');

    options.gradient = options.gradient || defaults.gradient;
    options.gradient = String(JSON.parse(options.gradient));

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this, hist = new Array(256).fill(0);

    function extraManipulation(pixels) {
      // if (!options.inBrowser)
      //     require('fs').writeFileSync('./output/histo.txt', hist.reduce((tot, cur, idx) => `${tot}\n${idx} : ${cur}`, ``));
      for (let x = 0; x < pixels.shape[0]; x++) {
        for (let y = 0; y < pixels.shape[1]; y++) {
          let pixVal = Math.round(pixels.get(x, y, 0) + pixels.get(x, y, 1) + pixels.get(x, y, 2)) / 3;
          hist[pixVal]++;
        }
      }
      var newarray = new Uint8Array(4 * 256 * 256);
      pixels.data = newarray;
      pixels.shape = [256, 256, 4];
      pixels.stride[1] = 4 * 256;

      for (let x = 0; x < 256; x++) {
        for (let y = 0; y < 256; y++) {
          pixelSetter(x, y, [255, 255, 255, 255], pixels);

        }
      }

      let startY = options.gradient ? 10 : 0;
      if (options.gradient) {
        for (let x = 0; x < 256; x++) {
          for (let y = 0; y < 10; y++) {
            pixelSetter(x, 255 - y, [x, x, x], pixels);

          }
        }
      }

      let convfactor = (256 - startY) / Math.max(...hist);

      for (let x = 0; x < 256; x++) {
        let pixCount = Math.round(convfactor * hist[x]);

        for (let y = startY; y < pixCount; y++) {
          pixelSetter(x, 255 - y, [204, 255, 153], pixels);

        }
      }

      return pixels;
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
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
