const _ = require('lodash')

//define kernels for the sobel filter
const kernelx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
    kernely = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

module.exports = function(pixels, highThresholdRatio, lowThresholdRatio, inBrowser) {
    let angles = [], mags = [], strongEdgePixels = [], weakEdgePixels = [], notInUI = !inBrowser;
    for (var x = 0; x < pixels.shape[0]; x++) {
        angles.push([]);
        mags.push([]);
        for (var y = 0; y < pixels.shape[1]; y++) {
            var result = changePixel(
                pixels,
                pixels.get(x, y, 0),
                pixels.get(x, y, 3),
                x,
                y
            );
            let pixel = result.pixel;

            pixels.set(x, y, 0, pixel[0]);
            pixels.set(x, y, 1, pixel[1]);
            pixels.set(x, y, 2, pixel[2]);
            pixels.set(x, y, 3, pixel[3]);

            mags.slice(-1)[0].push(pixel[3]);
            angles.slice(-1)[0].push(result.angle);
        }
    }
    nonMaxSupress(pixels, mags, angles);
    doubleThreshold(pixels, highThresholdRatio, lowThresholdRatio, mags, strongEdgePixels, weakEdgePixels);
    return pixels;
}

//changepixel function that convolutes every pixel (sobel filter)
function changePixel(pixels, val, a, x, y) {
    let magX = 0.0;
    for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {

            let xn = x + a - 1;
            let yn = y + b - 1;

            magX += pixels.get(xn, yn, 0) * kernelx[a][b];
        }
    }
    let magY = 0.0;
    for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {

            let xn = x + a - 1;
            let yn = y + b - 1;

            magY += pixels.get(xn, yn, 0) * kernely[a][b];
        }
    }
    let mag = Math.sqrt(Math.pow(magX, 2) + Math.pow(magY, 2));
    let angle = Math.atan2(magY, magX);
    return {
        pixel:
            [val, val, val, mag],
        angle: angle
    };
}

//Non Maximum Supression without interpolation
function nonMaxSupress(pixels, mags, angles) {

    angles = angles.map((arr) => arr.map(convertToDegrees));

    for (let i = 1; i < pixels.shape[0] - 1; i++) {
        for (let j = 1; j < pixels.shape[1] - 1; j++) {

            let angle = angles[i][j];
            let pixel = pixels.get(i, j);

            if ((angle >= -22.5 && angle <= 22.5) ||
                (angle < -157.5 && angle >= -180))

                if ((mags[i][j] >= mags[i][j + 1]) &&
                    (mags[i][j] >= mags[i][j - 1]))
                    pixels.set(i, j, 3, mags[i][j]);
                else
                    pixels.set(i, j, 3, 0);

            else if ((angle >= 22.5 && angle <= 67.5) ||
                (angle < -112.5 && angle >= -157.5))

                if ((mags[i][j] >= mags[i + 1][j + 1]) &&
                    (mags[i][j] >= mags[i - 1][j - 1]))
                    pixels.set(i, j, 3, mags[i][j]);
                else
                    pixels.set(i, j, 3, 0);

            else if ((angle >= 67.5 && angle <= 112.5) ||
                (angle < -67.5 && angle >= -112.5))

                if ((mags[i][i] >= mags[i + 1][j]) &&
                    (mags[i][j] >= mags[i][j]))
                    pixels.set(i, j, 3, mags[i][j]);
                else
                    pixels.set(i, j, 3, 0);

            else if ((angle >= 112.5 && angle <= 157.5) ||
                (angle < -22.5 && angle >= -67.5))

                if ((mags[i][j] >= mags[i + 1][j - 1]) &&
                    (mags[i][j] >= mags[i - 1][j + 1]))
                    pixels.set(i, j, 3, mags[i][j]);
                else
                    pixels.set(i, j, 3, 0);

        }
    }
}
//Converts radians to degrees
var convertToDegrees = radians => (radians * 180) / Math.PI;

//Finds the max value in a 2d array like mags
var findMaxInMatrix = arr => Math.max(...arr.map(el => el.map(val => !!val ? val : 0)).map(el => Math.max(...el)));

//Applies the double threshold to the image
function doubleThreshold(pixels, highThresholdRatio, lowThresholdRatio, mags, strongEdgePixels, weakEdgePixels) {

    const highThreshold = findMaxInMatrix(mags) * highThresholdRatio;
    const lowThreshold = highThreshold * lowThresholdRatio;

    for (let i = 0; i < pixels.shape[0]; i++) {
        for (let j = 0; j < pixels.shape[1]; j++) {
            let pixelPos = [i, j];

            mags[i][j] > lowThreshold
                ? mags[i][j] > highThreshold
                    ? strongEdgePixels.push(pixelPos)
                    : weakEdgePixels.push(pixelPos)
                : pixels.set(i, j, 3, 0);
        }
    }

    strongEdgePixels.forEach(pix => pixels.set(pix[0], pix[1], 3, 255));
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



