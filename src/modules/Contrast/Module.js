// /*
// * Changes the Image Contrast
// */

module.exports = function Contrast(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.contrast = options.contrast || defaults.contrast;
  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    let contrast = options.contrast;

    contrast = Number(contrast);
    if (contrast < -100) contrast = -100;
    if (contrast > 100) contrast = 100;
    contrast = (100.0 + contrast) / 100.0;
    contrast *= contrast;

    function changeContrast(p){
      p -= 0.5;
      p *= contrast;
      p += 0.5;
      p *= 255;
      p = Math.max(0, p);
      p = Math.min(p, 255);
      return p;
    }

    function changePixel(r, g, b, a) {
      
      return [changeContrast(r / 255), changeContrast(g / 255), changeContrast(b / 255), a];
    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      callback: callback,
      inBrowser: options.inBrowser,
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
