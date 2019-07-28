module.exports = exports = function (options, pixels, oldPixels, callback) {
  const pixelSetter = require('../../util/pixelSetter.js');

  var QRCode = require('qrcode');
  QRCode.toDataURL(options.qrCodeString, function (err, url) {
    var getPixels = require('get-pixels');
    getPixels(url, function (err, qrPixels) {
      if (err) {
        console.log('Bad image path', image);
      }

      var imagejs = require('imagejs');
      var bitmap = new imagejs.Bitmap({ width: qrPixels.shape[0], height: qrPixels.shape[1] });
      bitmap._data.data = qrPixels.data;
      var resized = bitmap.resize({
        width: options.size, height: options.size,
        algorithm: 'bicubicInterpolation'
      });

      qrPixels.data = resized._data.data;
      qrPixels.shape = [options.size, options.size, 4];
      qrPixels.stride[1] = 4 * options.size;

      var width = oldPixels.shape[0],
        height = oldPixels.shape[1];
      var xe = width - options.size,
        ye = height - options.size;
      for (var m = 0; m < width; m++) {
        for (var n = 0; n < height; n++) {
          if (m >= xe && n >= ye) {
            pixelSetter(m, n, [qrPixels.get(m - xe, n - ye, 0), qrPixels.get(m - xe, n - ye, 1), qrPixels.get(m - xe, n - ye, 2), qrPixels.get(m - xe, n - ye, 3)], pixels);
          }

          else {
            pixelSetter(m, n, [qrPixels.get(m, n, 0), qrPixels.get(m, n, 1), qrPixels.get(m, n, 2), qrPixels.get(m, n, 3)], pixels);
          }

        }
      }
      callback();

    });
  });
};
