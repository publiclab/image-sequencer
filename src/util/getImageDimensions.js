module.exports = function getImageDimensions(img, cb) {
  var getPixels = require('get-pixels');
  var dimensions = { width: '', height: '' };
  getPixels(img, function(err, pixels) {
    dimensions.width = pixels.shape[0];
    dimensions.height = pixels.shape[1];
    cb(dimensions);
  });
};
  