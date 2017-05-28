/*
 * Demo Module. Does nothing.
 */
module.exports = function DoNothing(options) {
  options = options || {};
  options.title = "Do Nothing";

  var image;

  function draw(inputImage) {
       image = inputImage;
  }

  function get() {
    return image;
  }

  return {
    options: options,
    draw: draw,
    get: get
  }
}
