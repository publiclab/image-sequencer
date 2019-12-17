/*
 * General purpose per-pixel manipulation
 * accepting a changePixel() method to remix a pixel's channels
 */

/**
 * @method PixelManipulation
 * @description Function for changing pixel values of the image via different callback functions. Read the docs(https://github.com/publiclab/image-sequencer/blob/main/CONTRIBUTING.md) for more info.
 * @param {Object} image ndarray of pixels of the image
 * @param {Object} options object containing callbacks for manipulating pixels.
 * @returns {Null}
 */
module.exports = function PixelManipulation(image, options) {
  // To handle the case where pixelmanipulation is called on the input object itself
  // like input.pixelManipulation(options)
  
  const pixelSetter = require('../../util/pixelSetter.js');
  let wasmSuccess; // Whether wasm succeded or failed

  if (arguments.length <= 1) {
    options = image;
    image = this;
  }

  options = options || {};

  const getPixels = require('get-pixels'),
    savePixels = require('save-pixels');

  getPixels(image.src, function (err, pixels) {
    if (err) {
      console.log('Bad image path', image);
      return;
    }

    if (options.getNeighbourPixel) {
      options.getNeighbourPixel.fun = function getNeighborPixel(distX, distY) {
        return options.getNeighbourPixel(pixels, x, y, distX, distY);
      };
    }

    // Iterate through pixels
    // TODO: this could possibly be more efficient; see
    // https://github.com/p-v-o-s/infragram-js/blob/master/public/infragram.js#L173-L181


    if (options.preProcess) pixels = options.preProcess(pixels); // Allow for preprocessing of pixels.

    function extraOperation() {
      var res;
      if (options.extraManipulation) res = options.extraManipulation(pixels, generateOutput); // extraManipulation is used to manipulate each pixel individually.
      // There may be a more efficient means to encode an image object,
      // but node modules and their documentation are essentially arcane on this point.
      function generateOutput() {
        var chunks = [];
        var totalLength = 0;

        var r = savePixels(pixels, options.format, {
          quality: 100
        });

        r.on('data', function (chunk) {
          totalLength += chunk.length;
          chunks.push(chunk);
        });

        r.on('end', function () {
          var data = Buffer.concat(chunks, totalLength).toString('base64');
          var datauri = 'data:image/' + options.format + ';base64,' + data;
          if (options.output)
            options.output(options.image, datauri, options.format, wasmSuccess);
          if (options.callback) options.callback();
        });
      }

      if (res) {
        pixels = res;
        generateOutput();
      } else if (!options.extraManipulation) generateOutput();
    }

    if (!options.changePixel) extraOperation();

    if (options.changePixel) {

      /* Allows for Flexibility
       if per pixel manipulation is not required */

      const imports = {
        env: {
          consoleLog: console.log,
          perform: function (x, y) {
            let pixel = options.changePixel( // changePixel function is run over every pixel.
              pixels.get(x, y, 0),
              pixels.get(x, y, 1),
              pixels.get(x, y, 2),
              pixels.get(x, y, 3),
              x,
              y
            );

            pixelSetter(x, y, pixel, pixels);

          }
        }
      };

      function perPixelManipulation() {
        for (var x = 0; x < pixels.shape[0]; x++) {
          for (var y = 0; y < pixels.shape[1]; y++) {
            imports.env.perform(x, y);
          }
        }
      }

      const inBrowser = (options.inBrowser) ? 1 : 0;
      const test = (process.env.TEST) ? 1 : 0;

      if (options.useWasm) {
        if (options.inBrowser) {

          fetch('../../../dist/manipulation.wasm').then(response =>
            response.arrayBuffer()
          ).then(bytes =>
            WebAssembly.instantiate(bytes, imports)
          ).then(results => {
            results.instance.exports.manipulatePixel(pixels.shape[0], pixels.shape[1], inBrowser, test);
            wasmSuccess = true;

            extraOperation();
          }).catch(err => {
            console.log(err);
            console.log('WebAssembly acceleration errored; falling back to JavaScript in PixelManipulation');
            wasmSuccess = false;

            perPixelManipulation();
            extraOperation();
          });
        } else {
          try{
            const fs = require('fs');
            const path = require('path');
            const wasmPath = path.join(__dirname, '../../../', 'dist', 'manipulation.wasm');
            const buf = fs.readFileSync(wasmPath);
            WebAssembly.instantiate(buf, imports).then(results => {
              results.instance.exports.manipulatePixel(pixels.shape[0], pixels.shape[1], inBrowser, test);
              wasmSuccess = true;

              extraOperation();
            });
          }
          catch(err){
            console.log(err);
            console.log('WebAssembly acceleration errored; falling back to JavaScript in PixelManipulation');
            wasmSuccess = false;

            perPixelManipulation();
            extraOperation();
          }
        }
      } else {
        wasmSuccess = false;

        perPixelManipulation();
        extraOperation();
      }
    }
  });
};
