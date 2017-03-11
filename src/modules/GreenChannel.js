/*
 * Display only the green channel
 */
module.exports = function GreenChannel(options) {

  options = options || {};
  options.title = "Green channel only";
  options.description = "Displays only the green channel of an image";

  var image;

  //function setup() {} // optional

  function draw(_image) {
    image = _image;
    function changePixel(r, g, b, a) {
      return [0, g, 0, a];
    }
    return require('./PixelManipulation.js')(_image, {
      output: options.output,
      changePixel: changePixel
    });
  }

  return {
    options: options,
    image: image,
    //setup: setup, // optional
    draw:  draw
  }
}
