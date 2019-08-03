var _ = require('lodash');
module.exports = exports = function(pixels, constantFactor, kernelValues, texMode) {
  let kernel = kernelGenerator(constantFactor, kernelValues),
    pixs = {
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

  const convolve = require('../_nomodule/gpuUtils').convolve;
  const conPix = convolve([pixs.r, pixs.g, pixs.b], kernel, (pixels.shape[0] * pixels.shape[1]) < 400000 ? true : false);

  for (let y = 0; y < pixels.shape[1]; y++){
    for (let x = 0; x < pixels.shape[0]; x++){
      pixels.set(x, y, 0, Math.max(0, Math.min(conPix[0][y][x], 255)));
      pixels.set(x, y, 1, Math.max(0, Math.min(conPix[1][y][x], 255)));
      pixels.set(x, y, 2, Math.max(0, Math.min(conPix[2][y][x], 255)));
    }
  }

  return pixels;
};
function kernelGenerator(constantFactor, kernelValues) {
  kernelValues = kernelValues.split(' ');
  for (i = 0; i < 9; i++) {
    kernelValues[i] = Number(kernelValues[i]) * constantFactor;
  }
  let k = 0;
  let arr = [];
  for (y = 0; y < 3; y++) {
    arr.push([]);
    for (x = 0; x < 3; x++) {
      arr[y].push(kernelValues[k]);
      k += 1;
    }
  }
  return arr;
}