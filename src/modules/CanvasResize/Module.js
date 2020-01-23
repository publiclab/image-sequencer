const ndarray = require('ndarray');
/*
* Changes the Canvas Size
*/
const getPixels = require('get-pixels');
module.exports = function canvasResize(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  const pixelSetter = require('../../util/pixelSetter.js');

  var output;

  function draw(input, callback, progressObj) {

    options.width = parseInt(options.width || defaults.width);
    options.height = parseInt(options.height || defaults.height);
    options.x = parseInt(options.x || defaults.x);
    options.y = parseInt(options.y || defaults.y);
    color = options.color || defaults.color;

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function extraManipulation(pixels, setRenderState, generateOutput) {
      console.log(color);
      setRenderState(false);
      const getDataUri = require('../../util/getDataUri');
      getDataUri(pixels, input.format).then(dataUri => {
        getPixels(dataUri, (err, pix) => {
          if(err) console.log('get-pixels error: ', err);
          const { createCanvas, createImageData } = require('canvas');
          const canvas = createCanvas(options.width, options.height);
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.putImageData(new createImageData(new Uint8ClampedArray(pix.data), pix.shape[0], pix.shape[1]), options.x, options.y);
          getPixels(canvas.toDataURL(), (err, newPix) => {
            if(err) console.log('get-pixels error: ', err);
            pixels.data = newPix.data;
            pixels.shape = newPix.shape;
            pixels.stride = newPix.stride;
            setRenderState(true);
            generateOutput();
          });
        });
      });
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback,
      useWasm:options.useWasm
    });

  }
  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
