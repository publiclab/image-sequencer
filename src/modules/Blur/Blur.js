module.exports = exports = function(pixels, blur) {
  let kernel = kernelGenerator(blur),
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

  const conPix = convolve([pixs.r, pixs.g, pixs.b], kernel);

  for (let y = 0; y < pixels.shape[1]; y++){
    for (let x = 0; x < pixels.shape[0]; x++){
      pixels.set(x, y, 0, Math.max(0, Math.min(conPix[0][y][x], 255)));
      pixels.set(x, y, 1, Math.max(0, Math.min(conPix[1][y][x], 255)));
      pixels.set(x, y, 2, Math.max(0, Math.min(conPix[2][y][x], 255)));
    }
  }

  return pixels;

  //Generates a 5x5 Gaussian kernel
  function kernelGenerator(sigma = 1) {

    let kernel = [],
      sum = 0;

    if (sigma == 0) sigma += 0.05;

    const s = 2 * Math.pow(sigma, 2);

    for (let y = -2; y <= 2; y++) {
      kernel.push([]);
      for (let x = -2; x <= 2; x++) {
        let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        kernel[y + 2].push(Math.exp(-(r / s)));
        sum += kernel[y + 2][x + 2];
      }
    }

    for (let x = 0; x < 5; x++){
      for (let y = 0; y < 5; y++){
        kernel[y][x] = (kernel[y][x] / sum);
      }
    }

    return kernel;
  }
};
