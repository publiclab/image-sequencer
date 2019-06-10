/*
* Resolves Fisheye Effect
*/
module.exports = function DoNothing(options, UI) {

  var output;

  var gl = require('fisheyegl');

  function draw(input, callback) {

    var step = this;

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

      distorter = FisheyeGl({
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

      // generate fisheyegl output
      distorter.setImage(input.src, function() {

        // this output is accessible to Image Sequencer
        step.output = { src: canvas.toDataURL(), format: input.format };

        // Tell Image Sequencer and UI that step has been drawn
        callback();

      });

    }
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
