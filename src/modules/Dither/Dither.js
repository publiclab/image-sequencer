module.exports = function Dither(pixels, type) {
  type = type;
  let bayerThresholdMap = [
    [15, 135, 45, 165],
    [195, 75, 225, 105],
    [60, 180, 30, 150],
    [240, 120, 210, 90]
  ];

  let lumR = [];
  let lumG = [];
  let lumB = [];
  for (let i = 0; i < 256; i++) {
    lumR[i] = i * 0.299;
    lumG[i] = i * 0.587;
    lumB[i] = i * 0.114;
  }
  let threshold = 129;
  let imageDataLength = pixels.data.length;   //imageData.data.length;

  // Greyscale luminance (sets r pixels to luminance of rgb)
  for (let i = 0; i <= imageDataLength; i++) {
    pixels.data[i] = Math.floor(lumR[pixels.data[i++]] + lumG[pixels.data[i++]] + lumB[pixels.data[i++]]);
  }

  let w = pixels.shape[0];
  let newPixel, err;

  for (let currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {

    if (type === 'none') {
      // No dithering
      pixels.data[currentPixel] = pixels.data[currentPixel] < threshold ? 0 : 255;

    } else if (type === 'bayer') {

      // 4x4 Bayer ordered dithering algorithm
      let x = currentPixel / 4 % w;
      let y = Math.floor(currentPixel / 4 / w);
      let map = Math.floor((pixels.data[currentPixel] + bayerThresholdMap[x % 4][y % 4]) / 2);
      pixels.data[currentPixel] = (map < threshold) ? 0 : 255;

    } else if (type === 'floydsteinberg') {

      // Floyd–Steinberg dithering algorithm
      newPixel = pixels.data[currentPixel] < 129 ? 0 : 255;
      err = Math.floor((pixels.data[currentPixel] - newPixel) / 16);
      pixels.data[currentPixel] = newPixel;

      pixels.data[currentPixel + 4] += err * 7;
      pixels.data[currentPixel + 4 * w - 4] += err * 3;
      pixels.data[currentPixel + 4 * w] += err * 5;
      pixels.data[currentPixel + 4 * w + 4] += err * 1;

    } else {

      // Bill Atkinson's dithering algorithm
      newPixel = pixels.data[currentPixel] < threshold ? 0 : 255;
      err = Math.floor((pixels.data[currentPixel] - newPixel) / 8);
      pixels.data[currentPixel] = newPixel;

      pixels.data[currentPixel + 4] += err;
      pixels.data[currentPixel + 8] += err;
      pixels.data[currentPixel + 4 * w - 4] += err;
      pixels.data[currentPixel + 4 * w] += err;
      pixels.data[currentPixel + 4 * w + 4] += err;
      pixels.data[currentPixel + 8 * w] += err;

    }

    // Set g and b pixels equal to r
    pixels.data[currentPixel + 1] = pixels.data[currentPixel + 2] = pixels.data[currentPixel];
  }
  return pixels;

};
