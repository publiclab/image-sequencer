module.exports = exports = function(pixels, options){
	options.startingX = options.startingX || 0;
  options.startingY = options.startingY || 0;
	var ox = Number(options.startingX),
	  oy = Number(options.startingY),
	  iw = pixels.shape[0],
	  ih = pixels.shape[1],
    thickness = Number(options.thickness) || 1,
	  ex =  options.endX = Number(options.endX) - thickness || iw - 1,
	  ey = options.endY = Number(options.endY) -thickness || ih - 1,
    color = options.color || "0 0 0 255";
    color = color.split(" ");

  var drawSide = function(startX, startY, endX, endY){
    for (var n=startX; n <= endX+thickness; n++){
      for (var k=startY; k <= endY+thickness; k++){
        pixels.set(n, k, 0, color[0]);
        pixels.set(n, k, 1, color[1]);
        pixels.set(n, k, 2, color[2]);
        pixels.set(n, k, 3, color[3]);
      }
    }
  }

  drawSide(ox, oy, ox, ey); // Left
  drawSide(ex, oy, ex, ey); // Right
  drawSide(ox, oy, ex, oy); // Top
  drawSide(ox, ey, ex, ey); // Bottom
  return pixels;
}