const pixelSetter = require('../../util/pixelSetter.js'),
  getPixels = require('get-pixels');
  
module.exports = exports = function (options, pixels, oldPixels, url1,distorter, cb) {
    
        // var link = document.createElement('a');
        // link.download = "my-image.png";
        // link.href = url1;
        // link.click();
        // alert(distorter.lens.a)
        


        distorter.setImage(url1, function() {
            // document.getElementById('image-sequencer-canvas').remove();
            getPixels(distorter.getImage('image/png').src, function (err, qrPixels) {
            // alert(distorter.getImage().src)
            // var link = document.createElement('a');
            // link.download = "my-image.png";
            // link.href = url1;
            // link.click();
            // var ctx= canvas.getContext('2d');
            // var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // pixels.data = new Uint8Array(myImageData.data);
            for (let x = 0; x < oldPixels.shape[0]; x++) {
                for (let y = 0; y < oldPixels.shape[1]; y++) {
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

            if(cb) cb();
        });
    });
};