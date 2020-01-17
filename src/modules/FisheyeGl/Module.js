/*
* Resolves Fisheye Effect
*/
const _ = require('lodash');
module.exports = function DoNothing(options, UI) {

  var output;
  getPixels = require('get-pixels');
  gl = require('fisheyegl');
  

  function draw(input, callback,progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;
    var curr = 0;
    var isGif = input.src.includes('image/gif');
    function changePixel(r, g, b, a) {
      return [r, g, b, a];
    }

    
    function extraManipulation(pixels, setRenderState, generateOutput,datauri) {
      curr++;
      const oldPixels = _.cloneDeep(pixels);
      setRenderState(false); // Prevent rendering of final output image until extraManipulation completes.
      var canvas2 = document.createElement('canvas');
      canvas2.width = oldPixels.shape[0]; //img.width();
      canvas2.height = oldPixels.shape[1]; //img.height();
      var ctx2 = canvas2.getContext('2d');

      ctx2.putImageData(new ImageData(new Uint8ClampedArray(pixels.data), pixels.shape[0], pixels.shape[1]), 0, 0);
      var url1 = datauri;

      if (!options.inBrowser) {
        require('../_nomodule/gl-context')(input, callback, step, options);
      }
      else {
      
        var canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        canvas.setAttribute('id', 'image-sequencer-canvas'+curr.toString());
        document.body.append(canvas);
        
        var distorter = new FisheyeGl({
            selector: '#image-sequencer-canvas'+curr.toString()
        });
      }
      
      require('./fisheye')(options, pixels, oldPixels,url1,distorter,isGif, () => {
        
        setRenderState(true); // Allow rendering in the callback.
        generateOutput();
        
      });
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
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
