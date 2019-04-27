/*
* General purpose per-pixel manipulation
* accepting a changePixel() method to remix a pixel's channels
*/
module.exports = function PixelManipulation(image, options) {

  // To handle the case where pixelmanipulation is called on the input object itself
  // like input.pixelManipulation(options)
  if (arguments.length <= 1) {
    options = image;
    image = this;
  }

  options = options || {};

  const getPixels = require('get-pixels'),
    savePixels = require('save-pixels');

  getPixels(image.src, function(err, pixels) {
    if (err) {
      console.log('Bad image path', image);
      return;
    }

    if (options.getNeighbourPixel) {
      options.getNeighbourPixel.fun = function getNeighborPixel(distX, distY) {
        return options.getNeighbourPixel(pixels, x, y, distX, distY);
      };
    }

    // iterate through pixels;
    // TODO: this could possibly be more efficient; see
    // https://github.com/p-v-o-s/infragram-js/blob/master/public/infragram.js#L173-L181

    if (!options.inBrowser && !process.env.TEST) {
      try {
        var pace = require('pace')(pixels.shape[0] * pixels.shape[1]);
      } catch (e) {
        options.inBrowser = true;
      }
    }

    if (options.preProcess) pixels = options.preProcess(pixels); // Allow for preprocessing

    if (options.changePixel) {

      /* Allows for Flexibility
       if per pixel manipulation is not required */

      for (var x = 0; x < pixels.shape[0]; x++) {
        for (var y = 0; y < pixels.shape[1]; y++) {
          let pixel = options.changePixel(
            pixels.get(x, y, 0),
            pixels.get(x, y, 1),
            pixels.get(x, y, 2),
            pixels.get(x, y, 3),
            x,
            y
          );

          pixels.set(x, y, 0, pixel[0]);
          pixels.set(x, y, 1, pixel[1]);
          pixels.set(x, y, 2, pixel[2]);
          pixels.set(x, y, 3, pixel[3]);

          if (!options.inBrowser && !process.env.TEST) pace.op();
        }
      }
    }
    // perform any extra operations on the entire array:
    var res;
    if (options.extraManipulation) res = options.extraManipulation(pixels, generateOutput);
    // there may be a more efficient means to encode an image object,
    // but node modules and their documentation are essentially arcane on this point
    function generateOutput() {
      var chunks = [];
      var totalLength = 0;

      var r = savePixels(pixels, options.format, { quality: 100 });

      r.on('data', function(chunk) {
        totalLength += chunk.length;
        chunks.push(chunk);
      });

      r.on('end', function() {
        var data = Buffer.concat(chunks, totalLength).toString('base64');
        var datauri = 'data:image/' + options.format + ';base64,' + data;
        if (options.output)
          options.output(options.image, datauri, options.format);
        if (options.callback) options.callback();
      });
    }
    if (res) {
      pixels = res;
      generateOutput();
    }
    else if (!options.extraManipulation) generateOutput();
  });
};
