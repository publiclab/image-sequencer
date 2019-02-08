/*
 * Image thresholding with 'image-filter-threshold'
 */
module.exports = function ImageThreshold(options) {
  options = options || {};
  options.threshold = options.threshold || 30;

  var image;

  function draw(inputImage) {
    var canvas = document.createElement('canvas');
    canvas.width = inputImage.naturalWidth;
    canvas.height = inputImage.naturalHeight;
    var context = canvas.getContext('2d');
    context.drawImage(inputImage, 0, 0 );
    var imageData = context.getImageData(0, 0, inputImage.naturalWidth, inputImage.naturalHeight);

    var imageThreshold = require('image-filter-threshold');
    var imageFilterCore = require('image-filter-core');

    var result = imageThreshold({
      data: imageData,
      threshold: options.threshold
    }).then(function (imageData) {
      image = new Image();
      image.onload = function onLoad() {
        if (options.output) options.output(image);
      }
     image.src = imageFilterCore.convertImageDataToCanvasURL(imageData);
    });
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
