/*
 * Image thresholding with 'image-filter-threshold'
 */
module.exports = function ImageThreshold(options) {

  options = options || {};
  options.title = "Threshold image";
  options.threshold = options.threshold || 30;

  var image;

  function draw(inputImage) {
    $(inputImage).load(function(){
      if (typeof window !== 'undefined') var canvas = document.createElement('canvas');
      else {
        var Canvas = require("canvas");
        var canvas = new Canvas(inputImage.width, inputImage.height); 
      }
      canvas.width = inputImage.naturalWidth || inputImage.width; // node-canvas doesn't provide naturalWidth
      canvas.height = inputImage.naturalHeight || inputImage.height;
      var context = canvas.getContext('2d');
      context.drawImage(inputImage, 0, 0 );

      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

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
    });
  }

  return {
    options: options,
    image: image,
    draw: draw
  }
}
