// Read More: https://en.wikipedia.org/wiki/Canny_edge_detector

const pixelSetter = require('../../util/pixelSetter.js');

// Define kernels for the sobel filter.
const kernelx = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
  ],
  kernely = [
    [-1, -2, -1],
    [ 0, 0, 0],
    [ 1, 2, 1]
  ];

module.exports = function(pixels, highThresholdRatio, lowThresholdRatio, useHysteresis) {
  let angles = [], grads = [], strongEdgePixels = [], weakEdgePixels = [], pixelsToBeSupressed = [];

  for (var x = 0; x < pixels.shape[0]; x++) {
    grads.push([]);
    angles.push([]);
    for (var y = 0; y < pixels.shape[1]; y++) {
      var result = sobelFilter( // Convolves the sobel filter on every pixel
        pixels,
        x,
        y
      );
      let pixel = result.pixel;

      grads.slice(-1)[0].push(pixel[3]);
      angles.slice(-1)[0].push(result.angle);
    }
  }
  nonMaxSupress(pixels, grads, angles, pixelsToBeSupressed); // Non Maximum Suppression: Filter fine edges.
  doubleThreshold(pixels, highThresholdRatio, lowThresholdRatio, grads, strongEdgePixels, weakEdgePixels, pixelsToBeSupressed); // Double Threshold: Categorizes edges into strong and weak edges based on two thresholds.
  if(useHysteresis.toLowerCase() == 'true') hysteresis(strongEdgePixels, weakEdgePixels); // Optional Hysteresis (very slow) to minimize edges generated due to noise.

  strongEdgePixels.forEach(pixel => preserve(pixels, pixel)); // Makes the strong edges White.
  weakEdgePixels.forEach(pixel => supress(pixels, pixel)); // Makes the weak edges black(bg color) after filtering.
  pixelsToBeSupressed.forEach(pixel => supress(pixels, pixel)); // Makes the rest of the image black.

  return pixels;
};

/**
 * @method supress
 * @description Supresses (fills with background color) the specified (non-edge)pixel.
 * @param {Object} pixels ndarry of pixels
 * @param {Float32Array} pixel Pixel coordinates
 * @returns {Null}
 */
function supress(pixels, pixel) {
  pixelSetter(pixel[0], pixel[1], [0, 0, 0, 255], pixels);
}

/**
 * @method preserve
 * @description Preserve the specified pixel(of an edge).
 * @param {Object} pixels ndarray of pixels
 * @param {*} pixel Pixel coordinates
 * @returns {Null}
 */
function preserve(pixels, pixel) {
  pixelSetter(pixel[0], pixel[1], [255, 255, 255, 255], pixels);
}

/**
 * @method sobelFiler
 * @description Runs the sobel filter on the specified and neighbouring pixels.
 * @param {Object} pixels ndarray of pixels
 * @param {Number} x x-coordinate of the pixel
 * @param {Number} y y-coordinate of the pixel
 * @returns {Object} Object containing the gradient and angle.
 */
function sobelFilter(pixels, x, y) {
  let val = pixels.get(x, y, 0),
    gradX = 0.0,
    gradY = 0.0;

  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {

      let xn = x + a - 1,
        yn = y + b - 1;

      if (isOutOfBounds(pixels, xn, yn)) { // Fallback for coordinates which lie outside the image.
        gradX += pixels.get(xn + 1, yn + 1, 0) * kernelx[a][b]; // Fallback to nearest pixel
        gradY += pixels.get(xn + 1, yn + 1, 0) * kernely[a][b];
      }
      else {
        gradX += pixels.get(xn, yn, 0) * kernelx[a][b];
        gradY += pixels.get(xn, yn, 0) * kernely[a][b];
      }
    }
  }

  const grad = Math.sqrt(Math.pow(gradX, 2) + Math.pow(gradY, 2)),
    angle = Math.atan2(gradY, gradX);
  return {
    pixel: [val, val, val, grad],
    angle: angle
  };
}

/**
 * @method categorizeAngle
 * @description Categorizes the given angle into 4 catagories according to the Category Map given below.
 * @param {Number} angle Angle in degrees
 * @returns {Number} Category number of the given angle
 */
function categorizeAngle(angle){
  const pi = Math.PI;
  angle = angle > 0 ? angle : pi - Math.abs(angle); // Diagonally flip the angle if it is negative (since edge remains the same)

  if (angle <= pi / 8 || angle > 7 * pi / 8) return 1;
  else if (angle > pi / 8 && angle <= 3 * pi / 8) return 2;
  else if (angle > 3 * pi / 8 && angle <= 5 * pi / 8) return 3;
  else if (angle > 5 * pi / 8 && angle <= 7 * pi / 8) return 4;

  /* Category Map
  * 1 => E-W
  * 2 => NE-SW
  * 3 => N-S
  * 4 => NW-SE
  */
}

/**
 * @method isOutOfBounds
 * @description Checks whether the given coordinates lie outside the bounds of the image. Used for error handling in convolution.
 * @param {Object} pixels ndarray of pixels
 * @param {*} x x-coordinate of the pixel
 * @param {*} y y-coordinate of the pixel
 * @returns {Boolean} True if the given coordinates are out of bounds.
 */
function isOutOfBounds(pixels, x, y){
  return ((x < 0) || (y < 0) || (x >= pixels.shape[0]) || (y >= pixels.shape[1]));
}

const removeElem = (arr = [], elem) => { // Removes the specified element from the given array.
  return arr = arr.filter((arrelem) => {
    return arrelem !== elem;
  });
};

// Non Maximum Supression without interpolation.
function nonMaxSupress(pixels, grads, angles, pixelsToBeSupressed) {
  for (let x = 0; x < pixels.shape[0]; x++) {
    for (let y = 0; y < pixels.shape[1]; y++) {

      let angleCategory = categorizeAngle(angles[x][y]);

      if (!isOutOfBounds(pixels, x - 1, y - 1) && !isOutOfBounds(pixels, x + 1, y + 1)){
        switch (angleCategory){ // Non maximum suppression according to angle category
        case 1:
          if (!((grads[x][y] >= grads[x][y + 1]) && (grads[x][y] >= grads[x][y - 1]))) {
            pixelsToBeSupressed.push([x, y]);
          }
          break;

        case 2:
          if (!((grads[x][y] >= grads[x + 1][y + 1]) && (grads[x][y] >= grads[x - 1][y - 1]))){
            pixelsToBeSupressed.push([x, y]);
          }
          break;

        case 3:
          if (!((grads[x][y] >= grads[x + 1][y]) && (grads[x][y] >= grads[x - 1][y]))) {
            pixelsToBeSupressed.push([x, y]);
          }
          break;

        case 4:
          if (!((grads[x][y] >= grads[x + 1][y - 1]) && (grads[x][y] >= grads[x - 1][y + 1]))) {
            pixelsToBeSupressed.push([x, y]);
          }
          break;
        }
      }
    }
  }
}

// Finds the max value in a 2d array like grads.
var findMaxInMatrix = arr => Math.max(...arr.map(el => el.map(val => val ? val : 0)).map(el => Math.max(...el)));

// Applies the double threshold to the image.
function doubleThreshold(pixels, highThresholdRatio, lowThresholdRatio, grads, strongEdgePixels, weakEdgePixels, pixelsToBeSupressed) {

  const highThreshold = findMaxInMatrix(grads) * highThresholdRatio, // High Threshold relative to the strongest edge
    lowThreshold = highThreshold * lowThresholdRatio; // Low threshold relative to high threshold

  for (let x = 0; x < pixels.shape[0]; x++) {
    for (let y = 0; y < pixels.shape[1]; y++) {
      let pixelPos = [x, y];

      if (grads[x][y] > lowThreshold){
        if (grads[x][y] > highThreshold) {
          strongEdgePixels.push(pixelPos);
        }
        else {
          weakEdgePixels.push(pixelPos);
        }
      }
      else {
        pixelsToBeSupressed.push(pixelPos);
      }
    }
  }
}

/**
 * @method hysteresis
 * @description Filters weak edge pixels that are not connected to a strong edge pixel.
 * @param {Float32array} strongEdgePixels 2D array of strong edge pixel coordinates
 * @param {*} weakEdgePixels 2D array of weak edge pixel coordinated
 */
function hysteresis(strongEdgePixels, weakEdgePixels){
  strongEdgePixels.forEach(pixel => {
    let x = pixel[0],
      y = pixel[1];

    if (weakEdgePixels.includes([x + 1, y])) {
      removeElem(weakEdgePixels, [x + 1, y]);
    }
    else if (weakEdgePixels.includes([x - 1, y])) {
      removeElem(weakEdgePixels, [x - 1, y]);
    }
    else if (weakEdgePixels.includes([x, y + 1])) {
      removeElem(weakEdgePixels, [x, y + 1]);
    }
    else if(weakEdgePixels.includes([x, y - 1])) {
      removeElem(weakEdgePixels, [x, y - 1]);
    }
  });
}
