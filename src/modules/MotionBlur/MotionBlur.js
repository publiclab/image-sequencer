// Generates a 5x5 Gaussian kernel
function kernelGenerator(sigma = 1) {

  let kernel = [],
    sum = 0;

  if (sigma == 0) sigma += 0.05;

  const s = 2 * Math.pow(sigma, 2);

  for (let y = -10; y <= 10; y++) {
    kernel.push([]);
    for (let x = -10; x <= 10; x++) {
      let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      if (y == 0) {
        kernel[y + 10].push(Math.exp(-(r / s)));
      }
      else {
        kernel[y + 10].push(0);
      }
      sum += kernel[y + 10][x + 10];
    }
  }

  for (let x = 0; x < 21; x++){
    for (let y = 0; y < 21; y++){
      kernel[y][x] = (kernel[y][x] / sum);
    }
  }

  return kernel;
}

const imagejs = require('imagejs'),
  ndarray = require('ndarray');

module.exports = exports = function(pixels, finalPixels, rotate_value, width, height, cos, sin) {
  const pixelSetter = require('../../util/pixelSetter.js');
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.blur = options.blur || defaults.blur;

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


  // blur pixels using GPU
  let kernel = kernelGenerator(options.blur), // Generate the Gaussian kernel based on the sigma input.
    pixs = { // Separates the rgb channel pixels to convolve on the GPU.
      r: [],
      g: [],
      b: [],
    };

  for (let y = 0; y < finalPixels.shape[1]; y++){
    pixs.r.push([]);
    pixs.g.push([]);
    pixs.b.push([]);

    for (let x = 0; x < finalPixels.shape[0]; x++){
      pixs.r[y].push(finalPixels.get(x, y, 0));
      pixs.g[y].push(finalPixels.get(x, y, 1));
      pixs.b[y].push(finalPixels.get(x, y, 2));
    }
  }

  const convolve = require('../_nomodule/gpuUtils').convolve; // GPU convolution function.

  const conPix = convolve([pixs.r, pixs.g, pixs.b], kernel); // Convolves the pixels (all channels separately) on the GPU.

  for (let y = 0; y < finalPixels.shape[1]; y++){
    for (let x = 0; x < finalPixels.shape[0]; x++){
      var pixelvalue = [Math.max(0, Math.min(conPix[0][y][x], 255)),
        Math.max(0, Math.min(conPix[1][y][x], 255)),
        Math.max(0, Math.min(conPix[2][y][x], 255))];
      pixelSetter(x, y, pixelvalue, finalPixels); // Sets the image pixels according to the blurred values.
    }
  }
  
  return finalPixels;
};