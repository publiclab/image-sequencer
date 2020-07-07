const pixelSetter = require('../../util/pixelSetter.js'),
  getPixels = require('get-pixels'),
  savePixels = require('save-pixels'),
  ndarray = require('ndarray'),
  gifshot = require('gifshot'),
  fs = require('fs'),
  path = require('path'),
  getDataUri = require('../../util/getDataUri');
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

  const isGIF = image.src.includes('image/gif');
  let numFrames = 1, // Number of frames: 1 for a still image
    frames = [], // Ndarray of pixels of each frame
    perFrameShape, // Width, Height and color chanels of each frame
    wasmSuccess, // Whether wasm succeded or failed
    renderableFrames, // To block rendering in async modules
    resolvedFrames = 0; // Number of WASM promises resolved.

  /**
   * @description Sets the render state of the current frame. True -> Renderable and False -> Not Renderable.
   * @param {Boolean} state Render state of the frame
   * @returns {Number} Total number of renderable frames.
   */
  function setRenderState(state) {
    renderableFrames += state ? 1 : -1;
    return renderableFrames;
  }

  if (arguments.length <= 1) {
    options = image;
    image = this;
  }

  options = options || {};
  
  getPixels(image.src, function (err, pixels) {
    if (err) {
      console.log('get-pixels error: ', err);
      return;
    }

    // There may be a more efficient means to encode an image object,
    // but node modules and their documentation are essentially arcane on this point.
    function generateOutput() {
      if (!(renderableFrames < numFrames) && !(resolvedFrames < numFrames)) {

        if (isGIF) {
          const dataPromises = []; // Array of all DataURI promises

          for (let f = 0; f < numFrames; f++) {
            dataPromises.push(getDataUri(frames[f], options.format));
          }

          Promise.all(dataPromises).then(datauris => {
            const gifshotOptions = {
              images: datauris,
              frameDuration: 1, // Duration of each frame in 1/10 seconds.
              numFrames: datauris.length,
              gifWidth: perFrameShape[0],
              gifHeight: perFrameShape[1]
            };
  
            const gifshotCb = out => {
              if (out.error) {
                console.log('gifshot error: ', out.errorMsg);
              }
  
              if (options.output)
                options.output(options.image, out.image, 'gif', wasmSuccess);
              if (options.callback) options.callback();
            };

            if (options.inBrowser) {
              gifshot.createGIF(gifshotOptions, gifshotCb);
            }
            else {
              const nodejsGIFShot = eval('require')('./node-gifshot');
              nodejsGIFShot(gifshotOptions, gifshotCb);
            }
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

    // Get pixels of each frame
    if (isGIF) {
      const { shape } = pixels;
      const [
        noOfFrames,
        width,
        height,
        channels
      ] = shape;

      numFrames = noOfFrames;
      renderableFrames = noOfFrames; // Total number of renderable frames (mutable)
      perFrameShape = [width, height, channels]; // Shape of ndarray of each frame

      const numPixelsInFrame = width * height;

      /* Coalesce the GIF frames (Some GIFs store delta information in between frames
         i.e. Only the pixels which change between frames are stored. All these frames need to be
         "Coalesced" to get final GIF frame.
         More Info: https://www.npmjs.com/package/gif-extract-frames#why
      */

      // Credit for the below code: https://www.npmjs.com/package/gif-extract-frames
      // We couldn't use the library because it uses ES6 features which cannot be browserified
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
        frames.push(
          new ndarray(
            new Uint8Array(
              perFrameShape[0] *
              perFrameShape[1] *
              perFrameShape[2]
            ),
            perFrameShape
          )
        );

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

    // Manipulate every frame separately
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
        frames[f] = options.preProcess(framePix, setRenderState) || framePix; // Allow for preprocessing of framePix.
        perFrameShape = frames[f].shape;
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

        /**
         * @description Pure JS pixelmanipulation fallback when WASM is not working.
         */
        function perPixelManipulation() {
          for (var x = 0; x < framePix.shape[0]; x++) {
            for (var y = 0; y < framePix.shape[1]; y++) {
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
              results.instance.exports.manipulatePixel(framePix.shape[0], framePix.shape[1], inBrowser, test);
              
              wasmSuccess = true;
              resolvedFrames++;
              generateOutput();
            }).catch(err => {
              console.log(err);
              console.log('WebAssembly acceleration errored; falling back to JavaScript in PixelManipulation');
              perPixelManipulation();
              
              wasmSuccess = false;
              resolvedFrames++;
              generateOutput();
            });
          }
          else {
            try{
              const wasmPath = path.join(__dirname, '../../../', 'dist', 'manipulation.wasm');
              const buf = fs.readFileSync(wasmPath);
              WebAssembly.instantiate(buf, imports).then(results => {
                results.instance.exports.manipulatePixel(framePix.shape[0], framePix.shape[1], inBrowser, test);
                
                wasmSuccess = true;
                resolvedFrames++;
                generateOutput();
              });
            }
            catch(err){
              console.log(err);
              console.log('WebAssembly acceleration errored; falling back to JavaScript in PixelManipulation');
              perPixelManipulation();
              
              wasmSuccess = false;
              resolvedFrames++;
              generateOutput();
            }
          }
        }
        else {
          perPixelManipulation();
          
          wasmSuccess = false;
          resolvedFrames++;
          generateOutput();
        }
      }
      else resolvedFrames++;

      if (options.extraManipulation){
        frames[f] = options.extraManipulation(framePix, setRenderState, generateOutput) || framePix; // extraManipulation is used to manipulate each pixel individually.
        perFrameShape = frames[f].shape;
      }
      generateOutput();
    }
  });
};
