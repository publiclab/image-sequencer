module.exports = exports = function(pixels, options) {


  let defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  const pixelSetter = require('../../util/pixelSetter.js');

  let fillColor = options.fillColor || defaults.fillColor,
    x = parseInt(options.startingX) || defaults.startingX,
    y = parseInt(options.startingY) || defaults.startingY,
    height = pixels.shape[1],
    width = pixels.shape[0],
    r = pixels.get(x, y, 0),
    g = pixels.get(x, y, 1),
    b = pixels.get(x, y, 2),
    a = pixels.get(x, y, 3),
    queuex = [x],
    queuey = [y],
    curry, currx,
    north,
    south,
    n,
    tolerance = options.tolerance || defaults.tolerance,
    maxFactor = (1 + tolerance / 100),
    minFactor = (1 - tolerance / 100);
  fillColor = fillColor.substring(fillColor.indexOf('(') + 1, fillColor.length - 1); // extract only the values from rgba(_,_,_,_)
  fillColor = fillColor.split(',');
    
  function isSimilar(currx, curry) {
    return (pixels.get(currx, curry, 0) >= r * minFactor && pixels.get(currx, curry, 0) <= r * maxFactor &&
      pixels.get(currx, curry, 1) >= g * minFactor && pixels.get(currx, curry, 1) <= g * maxFactor &&
      pixels.get(currx, curry, 2) >= b * minFactor && pixels.get(currx, curry, 2) <= b * maxFactor &&
      pixels.get(currx, curry, 3) >= a * minFactor && pixels.get(currx, curry, 3) <= a * maxFactor);
  }

  while (queuey.length) {
    currx = queuex.pop();
    curry = queuey.pop();

    if (isSimilar(currx, curry)) {
      north = south = curry;

      do {
        north -= 1;
      } while (isSimilar(currx, north) && north >= 0);

      do {
        south += 1;
      } while (isSimilar(currx, south) && south < height);

      for (n = north + 1; n < south; n += 1) {
        pixelSetter(currx, n, fillColor, pixels);

        if (isSimilar(currx - 1, n)) {
          queuex.push(currx - 1);
          queuey.push(n);
        }
        if (isSimilar(currx + 1, n)) {
          queuex.push(currx + 1);
          queuey.push(n);
        }
      }
    }
  }

  return pixels;
};
