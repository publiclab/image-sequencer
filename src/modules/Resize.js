/*
 * Resize image
 */
module.exports = function Resize(options) {

  options = options || {};
  options.title = "Resize image";
  options.description = "Resizes image to given width";

  var image;

  function setup() {

  }

  function draw(_image) {



  }

  return {
    options: options,
    image: image,
    setup: setup,
    draw:  draw
  }
}
