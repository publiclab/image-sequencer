// Read More: https://en.wikipedia.org/wiki/Canny_edge_detector

const pixelSetter = require('../../util/pixelSetter.js');

// Define kernels for the sobel filter
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

let pixelsToBeSupressed = [];

module.exports = function(pixels, highThresholdRatio, lowThresholdRatio, useHysteresis) {
  let angles = [], grads = [], strongEdgePixels = [], weakEdgePixels = [];
  
  for (var x = 0; x < pixels.shape[0]; x++) {
    grads.push([]);
    angles.push([]);
    for (var y = 0; y < pixels.shape[1]; y++) {
      var result = sobelFilter( // convolves the sobel filter on every pixel
        pixels,
        x,
        y
      );
      let pixel = result.pixel;

      grads.slice(-1)[0].push(pixel[3]); // gradient(magnitude) of the edge
      angles.slice(-1)[0].push(result.angle); // angle of the edge
    }
  }
  nonMaxSupress(pixels, grads, angles); // Non Maximum Suppression: Filters fine edges
  doubleThreshold(pixels, highThresholdRatio, lowThresholdRatio, grads, strongEdgePixels, weakEdgePixels); // Double Threshold: Categorizes edges into strong and weak edges
  if(useHysteresis.toLowerCase() == 'true') hysteresis(strongEdgePixels, weakEdgePixels); // Optional Hysteresis to minimize edges generated due to noise. This process is quite slow

  strongEdgePixels.forEach(pixel => preserve(pixels, pixel)); // Makes the strong edges White
  weakEdgePixels.forEach(pixel => supress(pixels, pixel)); // Makes the weak edges black(bg color) after filtering
  pixelsToBeSupressed.forEach(pixel => supress(pixels, pixel)); // Makes the rest of the image black

  return pixels;
};

function supress(pixels, pixel) { // Fills the pixel with bg color(black) for non-edge pixels
  pixelSetter(pixel[0], pixel[1], [0, 0, 0, 255], pixels);
}

function preserve(pixels, pixel) { // Makes the pixel white(for edges)
  pixelSetter(pixel[0], pixel[1], [255, 255, 255, 255], pixels);
}

// sobelFilter function that convolves sobel kernel over every pixel
function sobelFilter(pixels, x, y) {
  let val = pixels.get(x, y, 0),
    gradX = 0.0,
    gradY = 0.0;

  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {

      let xn = x + a - 1,
        yn = y + b - 1;

      if (isOutOfBounds(pixels, xn, yn)) { // checks if the requested pixel is at the edges
        gradX += pixels.get(xn + 1, yn + 1, 0) * kernelx[a][b]; // fallback to nearest pixel
        gradY += pixels.get(xn + 1, yn + 1, 0) * kernely[a][b];
      }
      else {
        gradX += pixels.get(xn, yn, 0) * kernelx[a][b];
        gradY += pixels.get(xn, yn, 0) * kernely[a][b];
      }
    }
  }

  const grad = Math.sqrt(Math.pow(gradX, 2) + Math.pow(gradY, 2)), // gradient(magnitude)
    angle = Math.atan2(gradY, gradX); // angle
  return {
    pixel: [val, val, val, grad],
    angle: angle
  };
}

function categorizeAngle(angle){ // categorizes angles into 4 categories as shown in the Category Map below
  if ((angle >= -22.5 && angle <= 22.5) || (angle < -157.5 && angle >= -180)) return 1;
  else if ((angle >= 22.5 && angle <= 67.5) || (angle < -112.5 && angle >= -157.5)) return 2;
  else if ((angle >= 67.5 && angle <= 112.5) || (angle < -67.5 && angle >= -112.5)) return 3;
  else if ((angle >= 112.5 && angle <= 157.5) || (angle < -22.5 && angle >= -67.5)) return 4;

  /* Category Map
  * 1 => E-W
  * 2 => NE-SW
  * 3 => N-S
  * 4 => NW-SE
  */
}

function isOutOfBounds(pixels, x, y){ // checks if a pixel is outside the bounds of the image. Error handling for convolution
  return ((x < 0) || (y < 0) || (x >= pixels.shape[0]) || (y >= pixels.shape[1]));
}

const removeElem = (arr = [], elem) => { // removes an element from an array
  return arr = arr.filter((arrelem) => {
    return arrelem !== elem;
  });
};

// Non Maximum Supression without interpolation
function nonMaxSupress(pixels, grads, angles) {
  angles = angles.map((arr) => arr.map(convertToDegrees));

  for (let x = 0; x < pixels.shape[0]; x++) {
    for (let y = 0; y < pixels.shape[1]; y++) {

      let angleCategory = categorizeAngle(angles[x][y]);

      if (!isOutOfBounds(pixels, x - 1, y - 1) && !isOutOfBounds(pixels, x + 1, y + 1)){
        switch (angleCategory){ // nom maximum suppression according to angle category
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
// Converts radians to degrees
var convertToDegrees = radians => (radians * 180) / Math.PI;

// Finds the max value in a 2d array like grads
var findMaxInMatrix = arr => Math.max(...arr.map(el => el.map(val => val ? val : 0)).map(el => Math.max(...el)));

// Applies the double threshold to the image
function doubleThreshold(pixels, highThresholdRatio, lowThresholdRatio, grads, strongEdgePixels, weakEdgePixels) {

  const highThreshold = findMaxInMatrix(grads) * highThresholdRatio, // High Threshold relative to the strongest edge
    lowThreshold = highThreshold * lowThresholdRatio; // low threshold relative to high threshold

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

function hysteresis(strongEdgePixels, weakEdgePixels){ // hysteresis
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
