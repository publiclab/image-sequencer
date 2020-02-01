module.exports = function ArbitraryCrop(options, UI, util) {
  var defaults = require('../../util/getDefaults.js')(require('./info.json'));

  options.x1 = options.x1 || defaults.x1;
  options.y1 = options.y1 || defaults.y1;
  options.x2 = options.x2 || defaults.x2;
  options.y2 = options.y2 || defaults.y2;
  options.x3 = options.x3 || defaults.x3;
  options.y3 = options.y3 || defaults.y3;
  options.x4 = options.x4 || defaults.x4;
  options.y4 = options.y4 || defaults.y4;

  var output;

  // This function is called on every draw.
  function draw(input, callback, progressObj) {
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    var x1 = options.x1,
      y1 = options.y1,
      x2 = options.x2,
      y2 = options.y2,
      x3 = options.x3,
      y3 = options.y3,
      x4 = options.x4,
      y4 = options.y4;

    // Equation of line l1.
    function l1(x, y) {
      var d = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);
      return d;
    }

    // Equation of line l2.
    function l2(x, y) {
      var d = (x - x2) * (y4 - y2) - (y - y2) * (x4 - x2);
      return d;
    }

    // Equation of line l3.
    function l3(x, y) {
      var d = (x - x3) * (y4 - y3) - (y - y3) * (x4 - x3);
      return d;
    }

    // Equation of line l4.
    function l4(x, y) {
      var d = (x - x1) * (y3 - y1) - (y - y1) * (x3 - x1);
      return d;
    }

    function changePixel(r, g, b, a, x, y) {

      if(l1(x, y) * l3(x, y) <= 0 && l2(x, y) * l4(x, y) <= 0)  return [r, g, b, a];

      else return [r, g, b, 0];
    }

    function extraManipulation(pixels) {

      x = Math.min(x1, x2, x3, x4);
      y = Math.min(y1, y2, y3, y4);

      w = Math.max(x1, x2, x3, x4);
      h = Math.max(y1, y2, y3, y4);

      newPixels = require('../Crop/Crop')(pixels, {x, y, w, h});

      require('../../util/getDataUri')(newPixels, input.format).then(res => console.log(res));

      return newPixels;

    }

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = {
        src: datauri,
        format: mimetype,
        wasmSuccess,
        useWasm: options.useWasm
      };
    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui, //don't pass this in if you don't want your module to support progress bars
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback,
      useWasm: options.useWasm,
      extraManipulation
    });
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
