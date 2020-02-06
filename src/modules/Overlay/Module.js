module.exports = function Dynamic(options, UI, util) {
  const pixelSetter = require('../../util/pixelSetter.js');
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;

  if(options.step.inBrowser && !options.noUI && sequencer.getSteps().length < 2)
    options.offset = -1;

  if (options.step.inBrowser && !options.noUI) var ui = require('./Ui.js')(options.step, UI);

  var output;

  // This function is called on every draw.
  function draw(input, callback, progressObj) {

    options.offset = parseInt(options.offset || defaults.offset);

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    var parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');

    // save the pixels of the base image
    var baseStepImage = this.getStep(options.offset).image;
    var baseStepOutput = this.getOutput(options.offset);

    var getPixels = require('get-pixels');
    const ndarray = require('ndarray');

    getPixels(input.src, function(err, pixels) {
      let frames = [];
      let counter = 0;
      
      ////////////////////////////////////////////
      const isGIF = input.src.includes('image/gif');
      if (isGIF && pixels != null) {
        // console.log(pixels);
        // const { shape } = pixels;
        // const [
        //   noOfFrames,
        //   width,
        //   height,
        //   channels
        // ] = pixels.shape;
        const noOfFrames = pixels.shape[0];
        const width = pixels.shape[1];
        const height = pixels.shape[2];
        const channels = pixels.shape[3];
        // console.log('yooo');
  
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
        // parse the inputs
        parseCornerCoordinateInputs({
          iw: perFrameShape[0],
          ih: perFrameShape[1]
        },
        {
          x: { valInp: options.x, type: 'horizontal' },
          y: { valInp: options.y, type: 'vertical' },
        }, function(opt, input) {
          options.x = parseInt(input.x.valInp);
          options.y = parseInt(input.y.valInp);
        });
      }
      else if(pixels != null) {
        frames.push(pixels);
        // parse the inputs
        parseCornerCoordinateInputs({
          iw: pixels.shape[0],
          ih: pixels.shape[1]
        },
        {
          x: { valInp: options.x, type: 'horizontal' },
          y: { valInp: options.y, type: 'vertical' },
        }, function(opt, input) {
          options.x = parseInt(input.x.valInp);
          options.y = parseInt(input.y.valInp);
        });
      }

      

      options.secondImagePixels = frames;

      // function changePixel(r1, g1, b1, a1, x, y) {

      //   // overlay
      //   var p = options.secondImagePixels;
      //   if (x >= options.x
      //     && x - options.x < p.shape[0]
      //     && y >= options.y
      //     && y - options.y < p.shape[1])
      //     return [
      //       p.get(x - options.x, y - options.y, 0),
      //       p.get(x - options.x, y - options.y, 1),
      //       p.get(x - options.x, y - options.y, 2),
      //       p.get(x - options.x, y - options.y, 3)
      //     ];
      //   else
      //     return [r1, g1, b1, a1];
      // }

      function extraManipulation(first_pixels, setRenderState, generateOutput) {
        
        if(pixels != null ){
          setRenderState(false);
          var p = frames[counter];
          counter++;
          for (let x = 0; x < first_pixels.shape[0]; x++) {
            for (let y = 0; y <  first_pixels.shape[1]; y++) {
              if (x >= options.x
                    && x - options.x < p.shape[0]
                    && y >= options.y
                    && y - options.y < p.shape[1]){
                pixelSetter(
                  x,
                  y,
                  [
                    p.get(x, y, 0),
                    p.get(x, y, 1),
                    p.get(x, y, 2),
                    p.get(x, y, 3)
                  ],
                  first_pixels
                );
              }
            }
          }
          const getDataUri = require('../../util/getDataUri');
          
          setRenderState(true);
          generateOutput();
          
          
        }

      }

      function output(image, datauri, mimetype, wasmSuccess) {
        step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
      }

      function modifiedCallback() {
        if (options.step.inBrowser && !options.noUI) {
          ui.setup();
        }
        callback();
      }

      // run PixelManipulation on first Image pixels
      return require('../_nomodule/PixelManipulation.js')(baseStepOutput, {
        output: output,
        ui: options.step.ui,
        // changePixel: changePixel,
        extraManipulation: extraManipulation,
        format: baseStepOutput.format,
        image: baseStepImage,
        inBrowser: options.inBrowser,
        callback: modifiedCallback,
        useWasm:options.useWasm
      });
    });
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
