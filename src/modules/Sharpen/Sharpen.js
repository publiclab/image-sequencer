// Generates a 3x3 convolution sharpening kernel
function kernelGenerator(strength = 1) { //default value of sharpeningStrength set to 1

  let kernel = [
    [0, -1 * strength, 0],
    [-1 * strength, 5 * strength, -1 * strength],
    [0, -1 * strength, 0]
  ];
  return kernel;
}

module.exports = exports = function(pixels, sharpen) {
  const pixelSetter = require('../../util/pixelSetter.js');
    
  let kernel = kernelGenerator(sharpen), // Generate the kernel based on the strength input.
    pixs = { // Separates the rgb channel pixels to convolve on the GPU.
      r: [],
      g: [],
      b: [],
    };
  for (let y = 0; y < pixels.shape[1]; y++){
    pixs.r.push([]);
    pixs.g.push([]);
    pixs.b.push([]);

    for (let x = 0; x < pixels.shape[0]; x++){
      pixs.r[y].push(pixels.get(x, y, 0));
      pixs.g[y].push(pixels.get(x, y, 1));
      pixs.b[y].push(pixels.get(x, y, 2));
    }
  }

  const convolve = require('../_nomodule/gpuUtils').convolve; // GPU convolution function.

  const conPix = convolve([pixs.r, pixs.g, pixs.b], kernel); // Convolves the pixels (all channels separately) on the GPU.

  for (let y = 0; y < pixels.shape[1]; y++){
    for (let x = 0; x < pixels.shape[0]; x++){
      var pixelvalue = [Math.max(0, Math.min(conPix[0][y][x], 255)),
        Math.max(0, Math.min(conPix[1][y][x], 255)),
        Math.max(0, Math.min(conPix[2][y][x], 255))];

      pixelSetter(x, y, pixelvalue, pixels); // Sets the image pixels according to the sharpened values.
      
    }
  }
  return (pixels);
};