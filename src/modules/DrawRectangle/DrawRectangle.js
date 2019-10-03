module.exports = exports = function(pixels, options){
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  const pixelSetter = require('../../util/pixelSetter.js');

  options.startingX = options.startingX || defaults.startingX;
  options.startingY = options.startingY || defaults.startingY;
  var ox = Number(options.startingX),
	  oy = Number(options.startingY),
	  iw = pixels.shape[0],
	  ih = pixels.shape[1],
    thickness = Number(options.thickness) || defaults.thickness,
	  ex =  options.endX = Number(options.endX) - thickness || iw - 1,
	  ey = options.endY = Number(options.endY) - thickness || ih - 1,
    color = options.color || defaults.color;
  color = color.substring(color.indexOf('(') + 1, color.length - 1); // extract only the values from rgba(_,_,_,_)
  color = color.split(',');

  var drawSide = function(startX, startY, endX, endY){
    for (var n = startX; n <= endX + thickness; n++){
      for (var k = startY; k <= endY + thickness; k++){

        pixelSetter(n, k, [color[0], color[1], color[2]], pixels); //to remove 4th channel - pixels.set(n, k, 3, color[3]);
      }
    }
  };

  drawSide(ox, oy, ox, ey); // Left
  drawSide(ex, oy, ex, ey); // Right
  drawSide(ox, oy, ex, oy); // Top
  drawSide(ox, ey, ex, ey); // Bottom
  return pixels;
};