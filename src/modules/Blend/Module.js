module.exports = function Blend(options, UI, util) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.func = options.blend || defaults.blend;
  options.offset = options.offset || defaults.offset;
  options.blendMode = options.blendMode || defaults.blendMode;

  var output;

  // This function is called on every draw.
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    var getPixels = require('get-pixels');

    // convert offset as string to int
    if (typeof options.offset === 'string') options.offset = parseInt(options.offset);

    // save first image's pixels
    var priorStep = this.getStep(options.offset);

    if (priorStep.output === undefined) {
      this.output = input;
      UI.notify('Offset Unavailable', 'offset-notification');
      callback();
    }

    // see http://docs.gimp.org/en/gimp-concepts-layer-modes.html for other blend modes

    const multiply_mode = function (i, m) {
      return ~~( (i * m) / 255 );
    };
    const divide_mode = function (i, m) {
      return ~~( (256 * i) / (m + 1) );
    };

    const overlay_mode = function (i, m) {
      return ~~( (i / 255) * (i + ((2 * m) / 255) * (255 - i)) );
    };
    
    const screen_mode = function (i, m) {
      return ~~( 255 - ((255 - m) * (255 - i)) / 255 );
    };
    
    const sof_light_mode = function (i, m) {
      var Rs = screen_mode(i, m);
      return ~~( ((((255 - i) * m) + Rs) * i) / 255 );
    };
    
    const color_dodge = function (i, m) {
      return ~~( (256 * i) / (255 - m + 1) );
    };

    const burn_mode = function (i, m) {
      return ~~( 255 - (256 * (255 - i)) / (m + 1));
    };

    const grain_extract_mode = function (i, m) {
      return ~~( i - m + 128 );
    };

    const grain_merge_mode = function (i, m) {
      return ~~( i + m - 128 );
    };

    
    getPixels(priorStep.output.src, function(err, pixels) {
      options.firstImagePixels = pixels;

      // Convert to runnable code.
      if (typeof options.func === 'string') eval('options.func = ' + options.func);
      
      function changePixel(r2, g2, b2, a2, x, y) {
        // blend!
        let p = options.firstImagePixels;
        let r1 = p.get(x, y, 0),
          g1 = p.get(x, y, 1),
          b1 = p.get(x, y, 2),
          a1 = p.get(x, y, 3);

        const blends = {
          'Color Dodge': () => [color_dodge(r2, r1), color_dodge(g2, g1), color_dodge(b2, b1), 255],
          'Multiply': () => [multiply_mode(r2, r1), multiply_mode(g2, g1), multiply_mode(b2, b1), multiply_mode(a2, a1)],
          'Divide': () => [divide_mode(r2, r1), divide_mode(g2, g1), divide_mode(b2, b1), 255],
          'Overlay': () => [overlay_mode(r2, r1), overlay_mode(g2, g1), overlay_mode(b2, b1), 255],
          'Screen': () => [screen_mode(r2, r1), screen_mode(g2, g1), screen_mode(b2, b1), 255],
          'Soft Light': () => [sof_light_mode(r2, r1), sof_light_mode(g2, g1), sof_light_mode(b2, b1), 255],
          'Color Burn': () => [burn_mode(r2, r1), burn_mode(g2, g1), burn_mode(b2, b1), 255],
          'Grain Extract': () => [grain_extract_mode(r2, r1), grain_extract_mode(g2, g1), grain_extract_mode(b2, b1), 255],
          'Grain Merge': () => [grain_merge_mode(r2, r1), grain_merge_mode(g2, g1), grain_merge_mode(b2, b1), 255]
        };
        
        if(options.blendMode == 'custom')
          return options.func(
            r2, g2, b2, a2, r1, g1, b1, a1
          );
        else {
          return blends[options.blendMode]();
        }

      }

      function output(image, datauri, mimetype, wasmSuccess) {
        step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
      }

      // run PixelManipulatin on second image's pixels
      return require('../_nomodule/PixelManipulation.js')(input, {
        output: output,
        ui: options.step.ui,
        changePixel: changePixel,
        format: input.format,
        image: options.image,
        inBrowser: options.inBrowser,
        callback: callback,
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
