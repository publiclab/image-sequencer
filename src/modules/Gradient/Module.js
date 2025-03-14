const pixelSetter = require('../../util/pixelSetter.js'),
  pixelManipulation = require('../_nomodule/PixelManipulation'),
  parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');
module.exports = function Gradient(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  var output;

  // The function which is called on every draw.
  function draw(input, callback) {
    var step = this;

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }

    function extraManipulation(pixels) {

      options.gradientType = options.gradientType || defaults.gradientType;
      options.width = options.width || defaults.width;
      options.height = options.height || defaults.height;
      startingColor = options.startingColor || defaults.startingColor;
      endingColor = options.endingColor || defaults.endingColor;

      startingColor = startingColor.substring(startingColor.indexOf('(') + 1, startingColor.length - 1); // Extract only the values from rgba(_,_,_,_)
      startingColor = startingColor.split(',');
      endingColor = endingColor.substring(endingColor.indexOf('(') + 1, endingColor.length - 1); // Extract only the values from rgba(_,_,_,_)
      endingColor = endingColor.split(',');
      
      for(var i in startingColor)
        startingColor[i] = parseInt(startingColor[i]);
      for(var i in endingColor)
        endingColor[i] = parseInt(endingColor[i]);

      const [iw, ih] = [pixels.shape[0], pixels.shape[1]];

      parseCornerCoordinateInputs({iw, ih},
        {
          width: { valInp: options.width, type: 'horizontal'},
          height: { valInp: options.height, type: 'vertical' },
        }, function(opt, cord){
          options.width = Math.floor(cord.width.valInp);
          options.height = Math.floor(cord.height.valInp);
        });

      const [w, h] = [options.width, options.height];
      let newPixels = require('ndarray')(new Uint8Array(4 * w * h).fill(0), [w, h, 4]);
      if(options.gradientType === 'linear(left)' || options.gradientType === 'linear(bottom)') {
        for(var i = 0; i < w; i++) {
          for(var j = 0; j < h; j++) {
            let r = ((options.gradientType === 'linear(left)' ? (i / w) : (j / h)) * (endingColor[0] - startingColor[0])) + startingColor[0];
            let g = ((options.gradientType === 'linear(left)' ? (i / w) : (j / h)) * (endingColor[1] - startingColor[1])) + startingColor[1];
            let b = ((options.gradientType === 'linear(left)' ? (i / w) : (j / h)) * (endingColor[2] - startingColor[2])) + startingColor[2];
            pixelSetter(i, j, [r, g, b, 255], newPixels);
          }
        }
      }
      else {
        var maxDistance = Math.sqrt(Math.pow(Math.abs(w / 2), 2) + Math.pow(Math.abs(h / 2), 2));
        for(var i = 0; i < w; i++) {
          for(var j = 0; j < h; j++) {
            var distX = Math.abs(w / 2 - i);
            var distY = Math.abs(h / 2 - j);
            var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
            let r = ((endingColor[0] - startingColor[0]) * (distance / maxDistance)) + startingColor[0];
            let g = ((endingColor[1] - startingColor[1]) * (distance / maxDistance)) + startingColor[1];
            let b = ((endingColor[2] - startingColor[2]) * (distance / maxDistance)) + startingColor[2];
            pixelSetter(i, j, [r, g, b, 255], newPixels);
          }
        }
      }
      return newPixels;
    }

    return pixelManipulation(input, {
      output,
      extraManipulation,
      callback,
      format: input.format,
      image: options.image,
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
