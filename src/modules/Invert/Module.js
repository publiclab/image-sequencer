/*
 * Invert the image
 */
function Invert(options, UI) {

  var output;

  // The function which is called on every draw.
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a) {
      return [255 - r, 255 - g, 255 - b, a];
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

    }

    return input.pixelManipulation({
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
}
var info = {
  'name': 'invert',
  'description': 'Inverts the image.',
  'inputs': {
  }
};
module.exports = [Invert, info];
