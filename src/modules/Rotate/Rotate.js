module.exports = function Rotate(pixels, pixels2, options, rotate_value, width, height, cos, sin){
  var imagejs = require('imagejs');
  var height_half = Math.floor(height / 2);
  var width_half = Math.floor(width / 2);
  var dimension = width + height;

  if (rotate_value % 360 == 0)
    return pixels;
  function copyPixel(x1, y1, x2, y2,pixel_set,pixel_get){
    pixel_set.set(x1, y1, 0, pixel_get.get(x2, y2, 0));
    pixel_set.set(x1, y1, 1, pixel_get.get(x2, y2, 1));
    pixel_set.set(x1, y1, 2, pixel_get.get(x2, y2, 2));
    pixel_set.set(x1, y1, 3, pixel_get.get(x2, y2, 3));
  }

  pixels1 = require('ndarray')(new Uint8Array(4 * dimension * dimension).fill(0), [dimension, dimension, 4]);
  //copying all the pixels from image to pixels1
  for (var n = 0; n < pixels.shape[0]; n++){
    for (var m = 0; m < pixels.shape[1]; m++){
      copyPixel(n + height_half, m + width_half, n, m,pixels1,pixels);
    }
  }
  //rotating pixels1
  var bitmap = new imagejs.Bitmap({ width: pixels1.shape[0], height: pixels1.shape[1] });
  bitmap._data.data = pixels1.data;

  var rotated = bitmap.rotate({
    degrees: rotate_value,
  });
  pixels1.data = rotated._data.data;
  //cropping extra whitespace
  for (var n = 0; n < pixels2.shape[0]; n++){
    for (var m = 0; m < pixels2.shape[1]; m++){
      copyPixel(n, m, n + Math.floor(dimension / 2 -  Math.abs(width * cos / 2) - Math.abs(height * sin / 2)) - 1, m + Math.floor(dimension / 2 - Math.abs(height * cos / 2) - Math.abs(width * sin / 2)) - 1,pixels2,pixels1);
    }
  }
  return pixels2;
};
