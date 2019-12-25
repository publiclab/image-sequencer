const pixelSetter = require('../../util/pixelSetter.js'),
  getPixels = require('get-pixels'),
  QRCode = require('qrcode');
module.exports = exports = function (options, pixels, oldPixels, cb) {

  QRCode.toDataURL(options.qrCodeString, {width: options.size, scale: 1}, function (error, url) {
    getPixels(url, function (err, qrPixels) {
      if (err) {
        console.log('get-pixels error: ', err);
      }

      var width = oldPixels.shape[0],
        height = oldPixels.shape[1];

      var xe = width - options.size,
        ye = height - options.size;
      
      for (var m = 0; m < width; m++) {
        for (var n = 0; n < height; n++) {
          if (m >= xe && n >= ye) {
            pixelSetter(m, n, [qrPixels.get(m - xe, n - ye, 0), qrPixels.get(m - xe, n - ye, 1), qrPixels.get(m - xe, n - ye, 2), qrPixels.get(m - xe, n - ye, 3)], pixels);
          }
        }
      }
      
      if(cb) cb();
    });
  });
};
