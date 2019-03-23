module.exports = exports = function(pixels, options) {

    let defaults = require('./../../util/getDefaults.js')(require('./info.json'));

    let shadowDimension = options.shadowDimension || defaults.shadowDimension;

    shadowDimension = shadowDimension.split(" ");

    var firstValue = shadowDimension[0];
    var secondValue = shadowDimension[1];

    if (firstValue < 0 && secondValue < 0) {
        for (var i = 0; i < Math.abs(firstValue); i++) {
            for (var j = 0; j < pixels.shape[1]; j++) {
                let val = 255 - ((i / Math.abs(firstValue)) * 255);
                pixels.set(i, j, 0, val);
                pixels.set(i, j, 1, val);
                pixels.set(i, j, 2, val);
                pixels.set(i, j, 3, 255);
            }
        }

        for (var i = 0; i < pixels.shape[0]; i++) {
            for (var j = 0; j < Math.abs(secondValue); j++) {
                let val = 255 - ((j / Math.abs(secondValue)) * 255);
                if (i < pixels.shape[0] && j > i) {
                    continue;
                }
                else {
                    pixels.set(i, j, 0, val);
                    pixels.set(i, j, 1, val);
                    pixels.set(i, j, 2, val);
                    pixels.set(i, j, 3, 255);
                }
            }
        }
    }

    if (firstValue > 0 && secondValue < 0) {
        for (var i = pixels.shape[0]-Math.abs(firstValue); i < pixels.shape[0]; i++) {
            for (var j = 0; j < pixels.shape[1]; j++) {
                let val = (((i-pixels.shape[0]+Math.abs(firstValue)) / (Math.abs(firstValue))) * 255);
                if (i > pixels.shape[0]-Math.abs(firstValue) && j > i) {
                    continue;
                }
                else
                {
                    pixels.set(i, j, 0, val);
                    pixels.set(i, j, 1, val);
                    pixels.set(i, j, 2, val);
                    pixels.set(i, j, 3, 255);
                }
            }
        }

        for (var i = 0; i < pixels.shape[0]; i++) {
            for (var j = 0; j < Math.abs(secondValue); j++) {
                let val = 255 - ((j / Math.abs(secondValue)) * 255);
                if (i > pixels.shape[0]-Math.abs(firstValue) && j > (pixels.shape[0]-i)) {
                    continue;
                }
                else {
                    pixels.set(i, j, 0, val);
                    pixels.set(i, j, 1, val);
                    pixels.set(i, j, 2, val);
                    pixels.set(i, j, 3, 255);
                }
            }
        }
    }

    if (firstValue < 0 && secondValue > 0) {
        for (var i = 0; i < Math.abs(firstValue); i++) {
            for (var j = 0; j < pixels.shape[1]; j++) {
                let val = 255 - ((i / Math.abs(firstValue)) * 255);
                if (i < Math.abs(firstValue) && (pixels.shape[1]-j) < i) {
                    continue;
                }
                else {
                    pixels.set(i, j, 0, val);
                    pixels.set(i, j, 1, val);
                    pixels.set(i, j, 2, val);
                    pixels.set(i, j, 3, 255);
                }
            }
        }

        for (var i = 0; i < pixels.shape[0]; i++) {
            for (var j = pixels.shape[1]-Math.abs(secondValue); j < pixels.shape[1]; j++) {
                let val = (((j-pixels.shape[1]+Math.abs(secondValue)) / (Math.abs(secondValue))) * 255);
                if (i < Math.abs(firstValue) && pixels.shape[1]-j > i) {
                    continue;
                }
                else {
                    pixels.set(i, j, 0, val);
                    pixels.set(i, j, 1, val);
                    pixels.set(i, j, 2, val);
                    pixels.set(i, j, 3, 255);
                }
            }
        }
    }

    if (firstValue > 0 && secondValue > 0) {
        for (var i = pixels.shape[0]-Math.abs(firstValue); i < pixels.shape[0]; i++) {
            for (var j = 0; j < pixels.shape[1]; j++) {
                let val = (((i-pixels.shape[0]+Math.abs(firstValue)) / (Math.abs(firstValue))) * 255);
                if (i > pixels.shape[0]-Math.abs(firstValue) && (pixels.shape[1]-j) > (pixels.shape[0]-i))
                pixels.set(i, j, 0, val);
                pixels.set(i, j, 1, val);
                pixels.set(i, j, 2, val);
                pixels.set(i, j, 3, 255);
            }
        }

        for (var i = 0; i < pixels.shape[0]; i++) {
            for (var j = pixels.shape[1]-Math.abs(secondValue); j < pixels.shape[1]; j++) {
                let val = (((j-pixels.shape[1]+Math.abs(secondValue)) / (Math.abs(secondValue))) * 255);
                pixels.set(i, j, 0, val);
                pixels.set(i, j, 1, val);
                pixels.set(i, j, 2, val);
                pixels.set(i, j, 3, 255);
            }
        }
    }

    return pixels;
}
