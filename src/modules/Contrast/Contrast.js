var _ = require('lodash');
const pixelSetter = require('../../util/pixelSetter.js');

module.exports = exports = function(pixels, contrast) {
  let oldpix = _.cloneDeep(pixels);
  contrast = Number(contrast);
  if (contrast < -100) contrast = -100;
  if (contrast > 100) contrast = 100;
  contrast = (100.0 + contrast) / 100.0;
  contrast *= contrast;

  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
            
      var rgbarray = [oldpix.get(i, j, 0) / 255.0, oldpix.get(i, j, 1) / 255.0, oldpix.get(i, j, 2) / 255.0];
      for(var idx = 0;idx < 3;idx++){
        rgbarray[idx] -= 0.5;
        rgbarray[idx] *= contrast;
        rgbarray[idx] += 0.5;
        rgbarray[idx] *= 255;
        if (rgbarray[idx] < 0) rgbarray[idx] = 0;
        if (rgbarray[idx] > 255) rgbarray[idx] = 255;
      }
            
      pixelSetter(i, j, rgbarray, pixels);
            
    }
  }
  return pixels;
};