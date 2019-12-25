const pixelSetter = require('../../util/pixelSetter.js'),
  getPixels = require('get-pixels'),
  savePixels = require('save-pixels'),
  ndarray = require('ndarray'),
  gifshot = require('gifshot'),
  fs = require('fs'),
  path = require('path');
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

  const imgType = image.src.split(':')[1].split(';')[0].split('/')[1]; // MineType of the image -png, jpg, gif etc.
  const isGIF = imgType == 'gif';
  let numFrames = 1; // Number of frames: 1 for a still image
  let frames = []; // Ndarray of pixels of each frame
  let perFrameShape; // Width, Height and color chanels of each frame
  let wasmSuccess; // Whether wasm succeded or failed
  let doRender = true; // To block rendering in async modules

  function setRenderState(state) {
    doRender = state;
  }

  if (arguments.length <= 1) {
    options = image;
    image = this;
  }

  options = options || {};

  /**
   * @description Returns the DataURI of an image from its pixels
   * @param {"ndarray"} pix pixels ndarray of pixels of the image
   * @param {String} format Format/MimeType of the image input
   * @returns {Promise} Promise with DataURI as parameter in the callback
   */
  const getDataUri = (pix, format) => {
    return new Promise(resolve => {
      let chunks = [],
        totalLength = 0;

      let r = savePixels(pix, format, {
        quality: 100
      });

      r.on('data', function (chunk) {
        totalLength += chunk.length;
        chunks.push(chunk);
      });

      r.on('end', function () {
        let data = Buffer.concat(chunks, totalLength).toString('base64');
        let datauri = 'data:image/' + format + ';base64,' + data;
        
        resolve(datauri);
      });
    });
  };

  getPixels(image.src, function (err, pixels) {
    if (err) {
      console.log('get-pixels error: ', err);
      return;
    }

    // There may be a more efficient means to encode an image object,
    // but node modules and their documentation are essentially arcane on this point.
    function generateOutput() {
      if (doRender) {
        if (isGIF) {
          const dataPromises = [];
          for (let f = 0; f < numFrames; f++) {
            dataPromises.push(getDataUri(frames[f], options.format));
          }

          Promise.all(dataPromises).then(datauris => {
            gifshot.createGIF({
              images: datauris,
              frameDuration: 1,
              numFrames: datauris.length,
              gifWidth: perFrameShape[0],
              gifHeight: perFrameShape[1]
            },
            function(obj) {
              if (obj.error) {
                console.log('gifshot error: ', obj.error);
              }

              if (options.output)
                options.output(options.image, obj.image, 'gif', wasmSuccess);
              if (options.callback) options.callback();
            });
          });
        }
        else {
          getDataUri(frames[0], options.format).then(datauri => {
            if (options.output)
              options.output(options.image, datauri, options.format, wasmSuccess);
            if (options.callback) options.callback();
          });
        }
      }
    }

    if (isGIF) {
      const { shape } = pixels;

      const [
        noOfFrames,
        width,
        height,
        channels
      ] = shape;

      numFrames = noOfFrames;
      perFrameShape = [width, height, channels];

      const numPixelsInFrame = width * height;

      // Coalesce the GIF frames
      for (let i = 0; i < numFrames; ++i) {
        if (i > 0) {
          const currIndex = pixels.index(i, 0, 0, 0);
          const prevIndex = pixels.index(i - 1, 0, 0, 0);
  
          for (let j = 0; j < numPixelsInFrame; ++j) {
            const curr = currIndex + j * channels;
  
            if (pixels.data[curr + channels - 1] === 0) {
              const prev = prevIndex + j * channels;
  
              for (let k = 0; k < channels; ++k) {
                pixels.data[curr + k] = pixels.data[prev + k];
              }
            }
          }
        }
      }

      for (let f = 0; f < numFrames; f++) {
        frames.push(ndarray([], perFrameShape));

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            for (let c = 0; c < channels; c++) {
              frames[f].set(x, y, c, pixels.get(f, x, y, c));
            }
          }
        }
      }
    }
    else {
      frames.push(pixels);
    }

    for (let f = 0; f < numFrames; f++) {
      let framePix = frames[f];

      if (options.getNeighbourPixel) {
        options.getNeighbourPixel.fun = function getNeighborPixel(distX, distY) {
          return options.getNeighbourPixel(framePix, x, y, distX, distY);
        };
      }

      // Iterate through framePix
      // TODO: this could possibly be more efficient; see
      // https://github.com/p-v-o-s/infragram-js/blob/master/public/infragram.js#L173-L181


      if (options.preProcess){
        framePix = options.preProcess(framePix); // Allow for preprocessing of framePix.
        perFrameShape = framePix.shape;
      }

      if (options.changePixel) {

        /* Allows for Flexibility
        if per pixel manipulation is not required */
        const imports = {
          env: {
            consoleLog: console.log,
            perform: function (x, y) {
              let pixel = options.changePixel( // changePixel function is run over every pixel.
                framePix.get(x, y, 0),
                framePix.get(x, y, 1),
                framePix.get(x, y, 2),
                framePix.get(x, y, 3),
                x,
                y
              );

              pixelSetter(x, y, pixel, framePix);

            }
          }
        };

        function perPixelManipulation() {
          for (var x = 0; x < framePix.shape[0]; x++) {
            for (var y = 0; y < framePix.shape[1]; y++) {
              imports.env.perform(x, y);
            }
          }
        }

        const inBrowser = (options.inBrowser) ? 1 : 0;
        const test = (process.env.TEST) ? 1 : 0;

        // if (options.useWasm) {
        //   if (options.inBrowser) {

        //     fetch('../../../dist/manipulation.wasm').then(response =>
        //       response.arrayBuffer()
        //     ).then(bytes =>
        //       WebAssembly.instantiate(bytes, imports)
        //     ).then(results => {
        //       results.instance.exports.manipulatePixel(framePix.shape[0], framePix.shape[1], inBrowser, test);
        //       wasmSuccess = true;
        //     }).catch(err => {
        //       console.log(err);
        //       console.log('WebAssembly acceleration errored; falling back to JavaScript in PixelManipulation');
        //       wasmSuccess = false;

        //       perPixelManipulation();
        //     });
        //   } else {
        //     try{
        //       const wasmPath = path.join(__dirname, '../../../', 'dist', 'manipulation.wasm');
        //       const buf = fs.readFileSync(wasmPath);
        //       WebAssembly.instantiate(buf, imports).then(results => {
        //         results.instance.exports.manipulatePixel(framePix.shape[0], framePix.shape[1], inBrowser, test);
        //         wasmSuccess = true;
        //       });
        //     }
        //     catch(err){
        //       console.log(err);
        //       console.log('WebAssembly acceleration errored; falling back to JavaScript in PixelManipulation');
        //       wasmSuccess = false;

        //       perPixelManipulation();
        //     }
        //   }
        // } else {
        //   wasmSuccess = false;

        //   perPixelManipulation();
        // }

        perPixelManipulation();
      }
      if (options.extraManipulation){
        framePix = options.extraManipulation(framePix, setRenderState, generateOutput) || framePix; // extraManipulation is used to manipulate each pixel individually.
        perFrameShape = framePix.shape;
      }
    }

    generateOutput();
  });
};
