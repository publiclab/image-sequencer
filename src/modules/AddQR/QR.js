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

      const xe = Math.min(options.startingX, width - options.size), // Starting pixel coordinates
        ye = Math.min(options.startingY, height - options.size);

      for (let x = xe; x < Math.min(xe + options.size, width); x++) {
        for (let y = ye; y < Math.min(ye + options.size, height); y++) {
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
