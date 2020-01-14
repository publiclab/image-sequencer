/*
* Average all pixel colors
*/
module.exports = function Average(options, UI) {

  var output;

  options.step.metadata = options.step.metadata || {};

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    // do the averaging
    function extraManipulation(pixels) {
      var i = 0, sum = [0, 0, 0, 0];
      while (i < pixels.data.length) {
        sum[0] += pixels.data[i++];
        sum[1] += pixels.data[i++];
        sum[2] += pixels.data[i++];
        sum[3] += pixels.data[i++];
      }

      let divisor = pixels.data.length / 4;

      sum[0] = Math.floor(sum[0] / divisor);
      sum[1] = Math.floor(sum[1] / divisor);
      sum[2] = Math.floor(sum[2] / divisor);
      sum[3] = Math.floor(sum[3] / divisor);

      i = 0;
      while (i < pixels.data.length) {
        pixels.data[i++] = sum[0];
        pixels.data[i++] = sum[1];
        pixels.data[i++] = sum[2];
        pixels.data[i++] = sum[3];
      }

      // report back and store average in metadata:
      options.step.metadata.averages = sum;

      if (options.step.average === undefined) options.step.average = '';
      options.step.average += 'rgba(' + sum.join(', ') + ')';
      return pixels;
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      inBrowser: options.inBrowser,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
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
