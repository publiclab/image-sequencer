/*
 * NDVI with red filter (blue channel is infrared)
 */
module.exports = function NdviRed(options) {

  options = options || {};
  options.title = "NDVI for red-filtered cameras (blue is infrared)";
  var image;

  //function setup() {} // optional

  function draw(_image) {
    image = _image;
    function changePixel(r, g, b, a) {
      var ndvi = 255 * (b - r) / (1.00 * b + r);
      return [ndvi, ndvi, ndvi, a];
    }
    require('./PixelManipulation.js')(image, {
      output: options.output,
      changePixel: changePixel
    });
  }

  return {
    options: options,
    image: image,
    //setup: setup, // optional
    draw: draw
  }
}
