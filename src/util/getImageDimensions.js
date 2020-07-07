const getPixels = require('get-pixels');
module.exports = function getImageDimensions(img, cb) {
  let dimensions;
  getPixels(img, function(err, pixels) {
    if (pixels.shape.length === 4) {
      const [frames, width, height] = pixels.shape;
      dimensions = {
        frames,
        width,
        height
      };
    }
    else {
      const [width, height] = pixels.shape;
      dimensions = {
        width,
        height
      };
    }

    if (cb) cb(dimensions);
  });
};
  