const pixelSetter = require('../../util/pixelSetter.js'),
  getPixels = require('get-pixels'),
  QRCode = require('qrcode');
module.exports = exports = function (options, pixels, oldPixels, cb) {

  QRCode.toDataURL(options.qrCodeString, {width: options.size, scale: 1}, function (error, url) {
    getPixels(url, function (err, qrPixels) {
      if (err) {
        console.log('get-pixels error: ', err);
      }

      const width = oldPixels.shape[0],
        height = oldPixels.shape[1];

      const xe = width - options.size, // Starting pixel coordinates
        ye = height - options.size;
      
      for (let x = xe; x < width; x++) {
        for (let y = ye; y < height; y++) {
          pixelSetter(
            x,
            y,
            [
              qrPixels.get(x - xe, y - ye, 0),
              qrPixels.get(x - xe, y - ye, 1),
              qrPixels.get(x - xe, y - ye, 2),
              qrPixels.get(x - xe, y - ye, 3)
            ],
            pixels
          );
        }
      }

      if(cb) cb();
    });
  });
};
