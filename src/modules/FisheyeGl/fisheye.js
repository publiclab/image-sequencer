const pixelSetter = require('../../util/pixelSetter.js'),
  getPixels = require('get-pixels');
  
module.exports = exports = function (options, pixels, oldPixels, url1,distorter, isGif,cb) {
        // Parse the inputs
        options.a = parseFloat(options.a) || distorter.lens.a;
        options.b = parseFloat(options.b) || distorter.lens.b;
        options.Fx = parseFloat(options.Fx) || distorter.lens.Fx;
        options.Fy = parseFloat(options.Fy) || distorter.lens.Fy;
        options.scale = parseFloat(options.scale) || distorter.lens.scale;
        options.x = parseFloat(options.x) || distorter.fov.x;
        options.y = parseFloat(options.y) || distorter.fov.y;

        // Set fisheyegl inputs
        distorter.lens.a = options.a;
        distorter.lens.b = options.b;
        distorter.lens.Fx = options.Fx;
        distorter.lens.Fy = options.Fy;
        distorter.lens.scale = options.scale;
        distorter.fov.x = options.x;
        distorter.fov.y = options.y;

        distorter.setImage(url1, function() {
            getPixels(distorter.getImage().src, function (err, distorted) {
                
                for (let x = 0; x < oldPixels.shape[0]; x++) {
                    for (let y = 0; y < oldPixels.shape[1]; y++) {
                    if(isGif){ //In case of GIF we get a transposed image
                        pixelSetter(
                            x,
                            y,
                            [
                            distorted.get(y, x, 0),
                            distorted.get(y, x, 1),
                            distorted.get(y, x, 2),
                            distorted.get(y, x, 3)
                            ],
                            pixels
                        );
                    }
                    else{
                        pixelSetter(
                            x,
                            y,
                            [
                            distorted.get(x, y, 0),
                            distorted.get(x, y, 1),
                            distorted.get(x, y, 2),
                            distorted.get(x, y, 3)
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