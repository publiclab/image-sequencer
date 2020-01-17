const pixelSetter = require('../../util/pixelSetter.js'),
  getPixels = require('get-pixels');
  
module.exports = exports = function (options, pixels, oldPixels, url1,distorter, isGif,cb) {


        distorter.setImage(url1, function() {
            getPixels(distorter.getImage().src, function (err, qrPixels) {
            var ctx= canvas.getContext('2d');
            for (let x = 0; x < oldPixels.shape[0]; x++) {
                for (let y = 0; y < oldPixels.shape[1]; y++) {
                if(isGif){ //In case of GIF we get a transposed image
                    pixelSetter(
                        x,
                        y,
                        [
                        qrPixels.get(y, x, 0),
                        qrPixels.get(y, x, 1),
                        qrPixels.get(y, x, 2),
                        qrPixels.get(y, x, 3)
                        ],
                        pixels
                    );
                }
                else{
                    pixelSetter(
                        x,
                        y,
                        [
                        qrPixels.get(x, y, 0),
                        qrPixels.get(x, y, 1),
                        qrPixels.get(x, y, 2),
                        qrPixels.get(x, y, 3)
                        ],
                        pixels
                    );
                }
                }
            }

            if(cb) cb();
        });
    });
};