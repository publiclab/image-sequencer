var _ = require('lodash');

module.exports = exports = function(pixels, contrast) {
  let oldpix = _.cloneDeep(pixels);
  contrast = Number(contrast);
  if (contrast < -100) contrast = -100;
  if (contrast > 100) contrast = 100;
  contrast = (100.0 + contrast) / 100.0;
  contrast *= contrast;

  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      var r = oldpix.get(i, j, 0) / 255.0;
      r -= 0.5;
      r *= contrast;
      r += 0.5;
      r *= 255;
      if (r < 0) r = 0;
      if (r > 255) r = 255;


      var g = oldpix.get(i, j, 1) / 255.0;
      g -= 0.5;
      g *= contrast;
      g += 0.5;
      g *= 255;
      if (g < 0) g = 0;
      if (g > 255) g = 255;


      var b = oldpix.get(i, j, 2) / 255.0;
      b -= 0.5;
      b *= contrast;
      b += 0.5;
      b *= 255;
      if (b < 0) b = 0;
      if (b > 255) b = 255;


      pixels.set(i, j, 0, r);
      pixels.set(i, j, 1, g);
      pixels.set(i, j, 2, b);

    }
  }
  return pixels;
};