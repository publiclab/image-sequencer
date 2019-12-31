const ndarray = require('ndarray'),
  pixelSetter = require('../../util/pixelSetter'),
  parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');

module.exports = function Crop(pixels, options, cb) {
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;

  options.w = options.w || defaults.w;
  options.h = options.h || defaults.h;

  options.backgroundColor = options.backgroundColor || defaults.backgroundColor;

  const bg = options.backgroundColor.replace('rgba', '').replace('(', '').replace(')', '').split(',');

  let iw = pixels.shape[0], // Width of Original Image
    ih = pixels.shape[1], // Height of Original Image
    offsetX,
    offsetY,
    w,
    h;

  // Parse the inputs
  parseCornerCoordinateInputs({iw, ih},
    {
      x: { valInp: options.x, type: 'horizontal' },
      y: { valInp: options.y, type: 'vertical' },
      w: { valInp: options.w, type: 'horizontal' },
      h: { valInp: options.h, type: 'vertical' },
    }, function (opt, coord) {
      offsetX = Math.floor(coord.x.valInp);
      offsetY = Math.floor(coord.y.valInp);
      w = Math.floor(coord.w.valInp);
      h = Math.floor(coord.h.valInp);
    });

  const newPixels = new ndarray([], [w, h, 4]);

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      pixelSetter(x, y, bg, newPixels); // Set the background color
    }
  }

  for (
    let x = 0;
    x < Math.min(w - 1, offsetX + iw - 1);
    x++
  ) {
    for (
      let y = 0;
      y < Math.min(h - 1, offsetY + ih - 1);
      y++
    ) {
      const inputImgX = x + offsetX,
        inputImgY = y + offsetY;
      
      pixelSetter(x, y, [
        pixels.get(inputImgX, inputImgY, 0),
        pixels.get(inputImgX, inputImgY, 1),
        pixels.get(inputImgX, inputImgY, 2),
        pixels.get(inputImgX, inputImgY, 3)
      ], newPixels); // Set the background color
    }
  }

  if (cb) cb();

  return newPixels;
};
