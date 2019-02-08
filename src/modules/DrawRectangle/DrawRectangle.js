module.exports = exports = function(pixels, options){
	options.startingX = options.startingX || 0;
  options.startingY = options.startingY || 0;
	var ox = Number(options.startingX),
	  oy = Number(options.startingY),
	  iw = pixels.shape[0],
	  ih = pixels.shape[1],
	  ex =  options.endX = Number(options.endX) || iw - 1,
	  ey = options.endY = Number(options.endY) || ih - 1,
    thickness = Number(options.thickness) || 1,
    color = options.color || "0 0 0 255";

  color = color.split(" ");

  var drawSide = function(startY, startX, endY, endX, yIncrement, xIncrement, sign, incrementFactor = 1){
    for(var i = 0; i<thickness; i++){
      for(
        var n = (startY + i*yIncrement*sign)*4*iw + 4*(startX + i*xIncrement*sign);
        n <= (endY + i*yIncrement*sign)*4*iw + 4*(endX + i*xIncrement*sign);
        n = n+4*(incrementFactor)
      )
      {
        pixels.data[n] = color[0];
        pixels.data[n+1] = color[1];
        pixels.data[n+2] = color[2];
        pixels.data[n+3] = color[3];
      }
    }
  }

  drawSide(oy, ox, oy, ex, 1, 0, 1); // Top
  drawSide(ey, ox, ey, ex, 1, 0, -1); // Bottom
  drawSide(oy, ox, ey, ox, 0, 1, 1, iw); // Left
  drawSide(oy, ex, ey, ex, 0, 1, -1, iw); // Right

  return pixels;
}