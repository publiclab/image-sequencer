const imagejs = require('imagejs'),
  pixelSetter = require('../../util/pixelSetter'),
  ndarray = require('ndarray');
module.exports = function Resize(pixels, options) {
  const resize_value = parseFloat(options.resize);

  if (resize_value == 100) return pixels;

  const new_width = Math.round(pixels.shape[0] * (resize_value / 100)),
    new_height = Math.round(pixels.shape[1] * (resize_value / 100));

  const bitmap = new imagejs.Bitmap({
    width: pixels.shape[0],
    height: pixels.shape[1]
  });

  for (let x = 0; x < pixels.shape[0]; x++) {
    for (let y = 0; y < pixels.shape[1]; y++) {
      let r = pixels.get(x, y, 0),
        g = pixels.get(x, y, 1),
        b = pixels.get(x, y, 2),
        a = pixels.get(x, y, 3);

      bitmap.setPixel(x, y, r, g, b, a);
    }
  }

  const resized = bitmap.resize({
    width: new_width,
    height: new_height,
    algorithm: 'bicubicInterpolation'
  });

  const newPix = new ndarray([], [new_width, new_height, 4]);

  for (let x = 0; x < new_width; x++) {
    for (let y = 0; y < new_height; y++) {
      const { r, g, b, a } = resized.getPixel(x, y);
      pixelSetter(x, y, [r, g, b, a], newPix);
    }
  }

  return newPix;
};
