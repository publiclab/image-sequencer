module.exports = exports = function (options, pixels, oldPixels, callback) {
    var QRCode = require('qrcode')
    QRCode.toDataURL(options.qrCodeString, function (err, url) {
        var getPixels = require("get-pixels");
        getPixels(url, function (err, qrPixels) {
            if (err) {
                console.log("Bad image path", image);
            }

            var imagejs = require('imagejs');
            var bitmap = new imagejs.Bitmap({ width: qrPixels.shape[0], height: qrPixels.shape[1] });
            bitmap._data.data = qrPixels.data;
            var resized = bitmap.resize({
                width: options.size, height: options.size,
                algorithm: "bicubicInterpolation"
            });

            qrPixels.data = resized._data.data;
            qrPixels.shape = [options.size, options.size, 4];
            qrPixels.stride[1] = 4 * options.size;
            function copyPixel(x1, y1, x2, y2, pixelType) {
                if (pixelType == 'qr') {
                    pixels.set(x1, y1, 0, qrPixels.get(x2, y2, 0))
                    pixels.set(x1, y1, 1, qrPixels.get(x2, y2, 1))
                    pixels.set(x1, y1, 2, qrPixels.get(x2, y2, 2))
                    pixels.set(x1, y1, 3, qrPixels.get(x2, y2, 3))
                }
                else {
                    pixels.set(x1, y1, 0, oldPixels.get(x2, y2, 0))
                    pixels.set(x1, y1, 1, oldPixels.get(x2, y2, 1))
                    pixels.set(x1, y1, 2, oldPixels.get(x2, y2, 2))
                    pixels.set(x1, y1, 3, oldPixels.get(x2, y2, 3))
                }
            }

            var width = oldPixels.shape[0],
                height = oldPixels.shape[1];
            var xe = width - options.size,
                ye = height - options.size;
            for (var m = 0; m < width; m++) {
                for (var n = 0; n < height; n++) {
                    if (m >= xe && n >= ye)
                        copyPixel(m, n, m - xe, n - ye, 'qr');
                    else
                        copyPixel(m, n, m, n, 'old');
                }
            }
            callback();            

        })
    })
}
