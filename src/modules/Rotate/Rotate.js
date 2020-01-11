const imagejs = require('imagejs'),
  ndarray = require('ndarray'),
  pixelSetter = require('../../util/pixelSetter');

module.exports = function Rotate(pixels, finalPixels, rotate_value, width, height, cos, sin){
  const height_half = Math.floor(height / 2),
    width_half = Math.floor(width / 2);
  dimension = width + height;

  if (rotate_value % 360 == 0) return pixels;

  function copyPixel(x1, y1, x2, y2, finalPix, initPix) {
    finalPix.set(x1, y1, 0, initPix.get(x2, y2, 0));
    finalPix.set(x1, y1, 1, initPix.get(x2, y2, 1));
    finalPix.set(x1, y1, 2, initPix.get(x2, y2, 2));
    finalPix.set(x1, y1, 3, initPix.get(x2, y2, 3));
  }

  const intermediatePixels = new ndarray(
    new Uint8Array(4 * dimension * dimension).fill(255),
    [dimension, dimension, 4]
  ); // Intermediate ndarray of pixels with a greater size to prevent clipping.

  // Copying all the pixels from image to intermediatePixels
  for (let x = 0; x < pixels.shape[0]; x++){
    for (let y = 0; y < pixels.shape[1]; y++){
      copyPixel(x + height_half, y + width_half, x, y, intermediatePixels, pixels);
    }
  }

  // Rotating intermediatePixels
  const bitmap = new imagejs.Bitmap({ width: intermediatePixels.shape[0], height: intermediatePixels.shape[1] });
  
  for (let x = 0; x < intermediatePixels.shape[0]; x++) {
    for (let y = 0; y < intermediatePixels.shape[1]; y++) {
      let r = intermediatePixels.get(x, y, 0),
        g = intermediatePixels.get(x, y, 1),
        b = intermediatePixels.get(x, y, 2),
        a = intermediatePixels.get(x, y, 3);

      bitmap.setPixel(x, y, r, g, b, a);
    }
  }

  const rotated = bitmap.rotate({
    degrees: rotate_value,
  });

  for (let x = 0; x < intermediatePixels.shape[0]; x++) {
    for (let y = 0; y < intermediatePixels.shape[1]; y++) {
      const {r, g, b, a} = rotated.getPixel(x, y);
      pixelSetter(x, y, [r, g, b, a], intermediatePixels);
    }
  }

  // Cropping extra whitespace
  for (let x = 0; x < finalPixels.shape[0]; x++){
    for (let y = 0; y < finalPixels.shape[1]; y++){
      copyPixel(
        x,
        y,
        x +
        Math.floor(
          dimension / 2 -
          Math.abs(width * cos / 2) -
          Math.abs(height * sin / 2)
        ) - 1,
        y +
        Math.floor(
          dimension / 2 -
          Math.abs(height * cos / 2) -
          Math.abs(width * sin / 2)
        ) - 1,
        finalPixels,
        intermediatePixels
      );
    }
  }

  return finalPixels;
};
