const ndarray = require('ndarray'),
  pixelSetter = require('../../util/pixelSetter'),
  parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates');

module.exports = function Crop(pixels, options, cb) {
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.x = parseInt(options.x) || defaults.x;
  options.y = parseInt(options.y) || defaults.y;

  options.w = parseInt(options.w) || Math.floor(pixels.shape[0]);
  options.h = parseInt(options.h) || Math.floor(pixels.shape[1]);
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

  console.log(w, h, iw, ih);

  const newPixels = new ndarray([], [w, h, 4]);

  // for (var n = oy; n < oy + h; n++) {
  //   var offsetValue = 4 * w * n;
  //   if(n < ih){
  //     var start = n * 4 * iw + ox * 4;
  //     var end = n * 4 * iw + ox * 4 + 4 * w;
  //     var pushArray = Array.from(pixels.data.slice(start, end ));
  //     array.push.apply(array, pushArray);
  //   } else {
  //     array.push.apply(array, backgroundArray);
  //   }
  // }

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
  
  // var newarray = Uint8Array.from(array);
  // pixels.data = newarray;
  // pixels.shape = [w, h, 4];
  // pixels.stride[1] = 4 * w;

  if (cb) cb();

  return newPixels;
};
