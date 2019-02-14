const _ = require('lodash')

//define kernels for the sobel filter
const kernelx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
    kernely = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

module.exports = function(pixels, highThresholdRatio, lowThresholdRatio) {
  let angles = [], grads = [], strongEdgePixels = [], weakEdgePixels = [];
  for (var x = 0; x < pixels.shape[0]; x++) {
    angles.push([]);
    grads.push([]);
    for (var y = 0; y < pixels.shape[1]; y++) {
      var result = convolvePixel(
        pixels,
        x,
        y
      );
      let pixel = result.pixel;

      pixels.set(x, y, 0, pixel[0]);
      pixels.set(x, y, 1, pixel[1]);
      pixels.set(x, y, 2, pixel[2]);
      pixels.set(x, y, 3, pixel[3]);

      grads.slice(-1)[0].push(pixel[3]);
      angles.slice(-1)[0].push(result.angle);
    }
  }
  nonMaxSupress(pixels, grads, angles);
  doubleThreshold(pixels, highThresholdRatio, lowThresholdRatio, grads, strongEdgePixels, weakEdgePixels);
  hysteresis(pixels, strongEdgePixels, weakEdgePixels);
  return pixels;
}

// convolvePixel function that convolves every pixel (sobel filter)
function convolvePixel(pixels, x, y) {
  let val = pixels.get(x, y, 0);
  let gradX = 0.0;
  for (let a = -1; a < 2; a++) {
    for (let b = -1; b < 2; b++) {

      let xn = x + a;
      let yn = y + b;

      gradX += pixels.get(xn, yn, 0) * kernelx[a+1][b+1];
    }
  }
  let gradY = 0.0;
  for (let a = -1; a < 2; a++) {
    for (let b = -1; b < 2; b++) {

      let xn = x + a;
      let yn = y + b;

      gradY += pixels.get(xn, yn, 0) * kernely[a+1][b+1];
    }
  }
  let grad = Math.sqrt(Math.pow(gradX, 2) + Math.pow(gradY, 2));
  let angle = Math.atan2(gradX, gradY);
  return {
    pixel: [val, val, val, grad],
    angle: angle
  };
}

function categorizeAngle(angle){
  if ((angle >= -22.5 && angle <= 22.5) || (angle < -157.5 && angle >= -180)) return 1;
  else if ((angle >= 22.5 && angle <= 67.5) || (angle < -112.5 && angle >= -157.5)) return 2;
  else if ((angle >= 67.5 && angle <= 112.5) || (angle < -67.5 && angle >= -112.5)) return 3;
  else if ((angle >= 112.5 && angle <= 157.5) || (angle < -22.5 && angle >= -67.5)) return 4;

  /* Category Map
  * 1 => N-S
  * 2 => NE-SW
  * 3 => E-W
  * 4 => SE-NW
  */  
}

// Non Maximum Supression without interpolation
function nonMaxSupress(pixels, grads, angles) {

  angles = angles.map((arr) => arr.map(convertToDegrees));

  for (let x = 1; x < pixels.shape[0] - 1; x++) {
    for (let y = 1; y < pixels.shape[1] - 1; y++) {

      let angleCategory = categorizeAngle(angles[x][y]);

      switch (angleCategory){
        case 1:
          if ((grads[x][y] >= grads[x][y + 1]) && (grads[x][y] >= grads[x][y - 1])) {
            pixels.set(x, y, 0, grads[x][y]);
            pixels.set(x, y, 1, grads[x][y]);
            pixels.set(x, y, 2, grads[x][y]);
            pixels.set(x, y, 3, grads[x][y]);
          }
          else {
            supress(pixels, x, y);
          }

          break;
        
        case 2:
          if ((grads[x][y] >= grads[x + 1][y + 1]) && (grads[x][y] >= grads[x - 1][y - 1])){
            pixels.set(x, y, 0, grads[x][y]);
            pixels.set(x, y, 1, grads[x][y]);
            pixels.set(x, y, 2, grads[x][y]);
            pixels.set(x, y, 3, grads[x][y]);
          }
          else {
            supress(pixels, x, y);
          }

          break;

        case 3:
          if ((grads[x][y] >= grads[x + 1][y]) && (grads[x][y] >= grads[x - 1][y])) {
            pixels.set(x, y, 0, grads[x][y]);
            pixels.set(x, y, 1, grads[x][y]);
            pixels.set(x, y, 2, grads[x][y]);
            pixels.set(x, y, 3, grads[x][y]);
          }
          else {
            supress(pixels, x, y);
          }

          break;

        case 4:
          if ((grads[x][y] >= grads[x + 1][y - 1]) && (grads[x][y] >= grads[x - 1][y + 1])) {
            pixels.set(x, y, 0, grads[x][y]);
            pixels.set(x, y, 1, grads[x][y]);
            pixels.set(x, y, 2, grads[x][y]);
            pixels.set(x, y, 3, grads[x][y]);
          }
          else {
            supress(pixels, x, y);
          }

          break;
      }
    }
  }
}
//Converts radians to degrees
var convertToDegrees = radians => (radians * 180) / Math.PI;

//Finds the max value in a 2d array like grads
var findMaxInMatrix = arr => Math.max(...arr.map(el => el.map(val => !!val ? val : 0)).map(el => Math.max(...el)));

//Applies the double threshold to the image
function doubleThreshold(pixels, highThresholdRatio, lowThresholdRatio, grads, strongEdgePixels, weakEdgePixels) {

  const highThreshold = findMaxInMatrix(grads) * highThresholdRatio;
  const lowThreshold = highThreshold * lowThresholdRatio;

  for (let x = 0; x < pixels.shape[0]; x++) {
    for (let y = 0; y < pixels.shape[1]; y++) {
      let pixelPos = [x, y];

      if (grads[x][y] > lowThreshold){
        if (grads[x][y] <= highThreshold) weakEdgePixels.push(pixelPos);
        else strongEdgePixels.push(pixelPos);
      }
      else {
        supress(pixels, x, y);
      }
    }
  }
  strongEdgePixels.forEach(pixel => {
    // pixels.set(pixel[0], pixel[1], 0, 255);
    // pixels.set(pixel[0], pixel[1], 1, 255);
    // pixels.set(pixel[0], pixel[1], 2, 255);
    // pixels.set(pixel[0], pixel[1], 3, 255);
  })
}

//  hysteresis edge tracking algorithm -- not working as of now
/* function hysteresis(pixels) {
    function getNeighbouringPixelPositions(pixelPosition) {
        let x = pixelPosition[0], y = pixelPosition[1]
        return [[x + 1, y + 1],
        [x + 1, y],
        [x + 1, y - 1],
        [x, y + 1],
        [x, y - 1],
        [x - 1, y + 1],
        [x - 1, y],
        [x - 1, y - 1]]
    }

    //This can potentially be improved see  https://en.wikipedia.org/wiki/Connected-component_labeling
     for (weakPixel in weakEdgePixels) {
         let neighbourPixels = getNeighbouringPixelPositions(weakEdgePixels[weakPixel])
         for (pixel in neighbourPixels) {
             if (strongEdgePixels.find(el => _.isEqual(el, neighbourPixels[pixel]))) {
                 pixels.set(weakPixel[0], weakPixel[1], 3, 255)
                 weakEdgePixels.splice(weakPixel, weakPixel)
                 break
             }
         }
     }
     weakEdgePixels.forEach(pix => pixels.set(pix[0], pix[1], 3, 0))
     return pixels
} */

function supress(pixels, x, y){
  pixels.set(x, y, 0, 0);
  pixels.set(x, y, 0, 0);
  pixels.set(x, y, 0, 0);
  pixels.set(x, y, 0, 255);
}

function hysteresis(pixels, strongEdgePixels, weakEdgePixels){
  var preservedWeakPixels = [];
  
  weakEdgePixels.forEach(pixel => {
    let pixelX = pixel[0];
    let pixelY = pixel[1];

    for (var x = pixelX - 1; x <= pixelY + 1; x++){
      for (var y = pixelY - 1; y <= pixelY + 1; y++){
        if (x === pixelX && y === pixelY) return;
        if (strongEdgePixels.includes([x,y])){
          preservedWeakPixels.push([pixelX, pixelY]);
          return;
        }
      }
    }
  })

  weakEdgePixels.forEach(pixel => {
    if (preservedWeakPixels.includes([pixel[0], pixel[1]])) return;
    supress(pixels, pixel[0], pixel[1]);
  })

}