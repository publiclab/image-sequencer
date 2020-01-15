const getPixels = require('get-pixels');
module.exports = function getImageDimensions(img, cb) {
  let dimensions;
  let isGIF;
  getPixels(img, function(err, pixels) {
    if (pixels.shape.length === 4) {
      const [frames, width, height] = pixels.shape;
      dimensions = {
        frames,
        width,
        height
      };

      isGIF = true;
    }
    else {
      const [width, height] = pixels.shape;
      dimensions = {
        width,
        height
      };

      isGIF = false;
    }

    if (cb) cb(dimensions, isGIF);
  });
};
  