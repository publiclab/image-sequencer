/*
* Resolves Fisheye Effect
*/
const _ = require('lodash');
module.exports = function DoNothing(options, UI) {

  var output;
  getPixels = require('get-pixels');
  gl = require('fisheyegl');
  

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;
    var curr = 0;
    var isGif = input.src.includes('image/gif');
    function changePixel(r, g, b, a) {
      return [r, g, b, a];
    }

    
    function extraManipulation(pixels, setRenderState, generateOutput) {
      curr++;
      const oldPixels = _.cloneDeep(pixels);
      const getDataUri = require('../../util/getDataUri');
      setRenderState(false); // Prevent rendering of final output image until extraManipulation completes.
      
      if (!options.inBrowser) {
        require('../_nomodule/gl-context')(input, callback, step, options);
      }
      else {
      
        var canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        canvas.setAttribute('id', 'image-sequencer-canvas' + curr.toString());
        document.body.append(canvas);
        
        var distorter = new FisheyeGl({
          selector: '#image-sequencer-canvas' + curr.toString()
        });
      }
      getDataUri(pixels, input.format).then(dataUrl => {
        require('./fisheye')(options, pixels, oldPixels, dataUrl, distorter, () => {
          
          setRenderState(true); // Allow rendering in the callback.
          generateOutput();
          
        });
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
