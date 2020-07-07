module.exports = function ColorTemperature(options, UI) {
  
  const pixelSetter = require('../../util/pixelSetter.js');
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  var output;

  function draw(input, callback, progressObj) {

    options.temperature = options.temperature || defaults.temperature;
    options.temperature = (options.temperature > 40000) ? 40000 : options.temperature;
    options.temperature = (options.temperature < 0) ? 0 : options.temperature;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels) {

      let temp = parseInt(options.temperature);
      temp /= 100;

      let r, g, b;

      if (temp <= 66) {
        r = 255;
        g = Math.min(Math.max(99.4708025861 * Math.log(temp) - 161.1195681661, 0), 255);
      } else {
        r = Math.min(Math.max(329.698727446 * Math.pow(temp - 60, -0.1332047592), 0), 255);
        g = Math.min(Math.max(288.1221695283 * Math.pow(temp - 60, -0.0755148492), 0), 255);
      }

      if (temp >= 66) {
        b = 255;
      } else if (temp <= 19) {
        b = 0;
      } else {
        b = temp - 10;
        b = Math.min(Math.max(138.5177312231 * Math.log(b) - 305.0447927307, 0), 255);
      }

      for (let i = 0; i < pixels.shape[0]; i++) {
        for (let j = 0; j < pixels.shape[1]; j++) {

          var rgbdata = [pixels.get(i, j, 0), pixels.get(i, j, 1), pixels.get(i, j, 2)];
          rgbdata[0] = (255 / r) * rgbdata[0];
          rgbdata[1] = (255 / g) * rgbdata[1];
          rgbdata[2] = (255 / b) * rgbdata[2];
          pixelSetter(i, j, rgbdata, pixels);

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
    draw: draw,
    output: output,
    UI: UI
  };

};