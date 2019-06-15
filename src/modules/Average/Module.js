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

      // TODO: refactor into a new "display()" method as per https://github.com/publiclab/image-sequencer/issues/242
      if (options.step.inBrowser && options.step.ui) $(options.step.ui).find('.details').append('<p><b>Averages</b> (r, g, b, a): ' + sum.join(', ') + '</p>');
      return pixels;
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = {
        src: datauri,
        format: mimetype
      };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
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
