/*
* Resolves Fisheye Effect
*/
module.exports = function DoNothing(options, UI) {

  var output;

  var gl = require('fisheyegl');

  function draw(input, callback) {

    var step = this;

    
    function extraManipulation(pixels) {
      if (!options.inBrowser) {
        require('../_nomodule/gl-context')(input, callback, step, options);
      }
      else {
        // Create a canvas, if it doesn't already exist.
        if (!document.querySelector('#image-sequencer-canvas')) {
          var canvas = document.createElement('canvas');
          canvas.style.display = 'none';
          canvas.setAttribute('id', 'image-sequencer-canvas');
          document.body.append(canvas);
        }
        else var canvas = document.querySelector('#image-sequencer-canvas');

        var distorter = FisheyeGl({
          selector: '#image-sequencer-canvas'
        });

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
      }
      
      var canvas2 = document.createElement('canvas');
      canvas2.width = pixels.shape[0]; //img.width();
      canvas2.height = pixels.shape[1]; //img.height();
      var ctx2 = canvas2.getContext('2d');

      ctx2.putImageData(new ImageData(new Uint8ClampedArray(pixels.data), pixels.shape[0], pixels.shape[1]), 0, 0);
      var url1 = canvas2.toDataURL();
      
      
      distorter.setImage(url1, function() {
        
        var ctx= canvas.getContext('2d');
        var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        pixels.data = new Uint8Array(myImageData.data);
        
        return pixels;
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
