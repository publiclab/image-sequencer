const ndarray = require('ndarray'),
  pixelSetter = require('../../util/pixelSetter'),
  parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');

module.exports = function Crop(pixels, options, cb) {
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;

  options.w = options.w || Math.floor(pixels.shape[0]);
  options.h = options.h || Math.floor(pixels.shape[1]);
  options.backgroundColor = options.backgroundColor || defaults.backgroundColor;

  const bg = options.backgroundColor.replace('rgba', '').replace('(', '').replace(')', '').split(',');

  let offsetX = options.x,
    offsetY = options.y,
    w = options.w,
    h = options.h,
    iw = pixels.shape[0], // Width of Original Image
    ih = pixels.shape[1]; // Height of Original Image

  // Parse the inputs
  parseCornerCoordinateInputs(options, {
    iw,
    ih,
    x: { valInp: options.x, type: 'horizontal' },
    y: { valInp: options.y, type: 'vertical' },
    w: { valInp: options.w, type: 'horizontal' },
    h: { valInp: options.h, type: 'vertical' },
  }, function (options, coord) {
    options.x = parseInt(coord.x.valInp);
    options.y = parseInt(coord.y.valInp);
    options.w = coord.w.valInp;
    options.h = coord.h.valInp;
  });

  const newPixels = new ndarray([], [w, h, 4]);

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      pixelSetter(x, y, bg, newPixels); // Set the background color
    }
  }

  for (let x = offsetX; x < Math.min(offsetX + w - 1, iw - 1); x++) {
    for (let y = 0; y < Math.min(offsetY + h - 1, ih - 1); y++) {
      pixelSetter(x, y, [
        pixels.get(x, y, 0),
        pixels.get(x, y, 1),
        pixels.get(x, y, 2),
        pixels.get(x, y, 3)
      ], newPixels); // Set the background color
    }
  }

  if (cb) cb();

  return newPixels;
};
