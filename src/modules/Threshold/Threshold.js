module.exports = function Threshold(pixels, options, histData) {
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
   
  type = options.threshold ;
  threshold = parseInt(options.input) || defaults.input;
  var lumR = [];
  var lumG = [];
  var lumB = [];
  for (var i = 0; i < 256; i++) {
    lumR[i] = i * 0.299;
    lumG[i] = i * 0.587;
    lumB[i] = i * 0.114;
  }

  var imageDataLength = pixels.data.length;   //imageData.data.length;
  for (var i = 0; i <= imageDataLength; i++) {
    pixels.data[i] = Math.floor(lumR[pixels.data[i++]] + lumG[pixels.data[i++]] + lumB[pixels.data[i++]]);
  }

  if (type === 'Automatic Thresholding')
    threshold = otsu(histData);

  for (var currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {

    pixels.data[currentPixel] = pixels.data[currentPixel] < threshold ? 0 : 255;
    pixels.data[currentPixel + 1] = pixels.data[currentPixel + 2] = pixels.data[currentPixel];
  }
  return pixels;
};

function otsu(histData) {
  let total = 0;
  for (let t = 0; t < 256; t++) total += histData[t];

  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * histData[t];

  let sumB = 0;
  let wB = 0;
  let wF = 0;

  let varMax = 0;
  let threshold = 0;

  for (let t = 0; t < 256; t++) {
    wB += histData[t];               // Weight Background
    if (wB == 0) continue;

    wF = total - wB;                 // Weight Foreground
    if (wF == 0) break;

    sumB += t * histData[t];

    let mB = sumB / wB;            // Mean Background
    let mF = (sum - sumB) / wF;    // Mean Foreground

    // Calculate Between Class Variance
    let varBetween = wB * wF * (mB - mF) * (mB - mF);

    // Check if new maximum found
    if (varBetween > varMax) {
      varMax = varBetween;
      threshold = t;
    }
  }

  return threshold;

}