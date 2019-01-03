module.exports = exports = function(pixels, options){
	options.startingX = options.startingX || 0;
    options.startingY = options.startingY || 0;
	var ox = Number(options.startingX);
	var oy = Number(options.startingY);
	var iw = pixels.shape[0];
	var ih = pixels.shape[1];
	options.endX = Number(options.endX) || iw - 1;
	options.endY = Number(options.endY) || ih - 1;
	var ex = options.endX;
	var ey = options.endY;
    for(var n = oy*4*iw + 4*ox ; n < oy*4*iw + 4*(ex); n = n+4){
       pixels.data[n] = 0;
       pixels.data[n+1] = 0;
       pixels.data[n+2] = 0;
       pixels.data[n+3] = 255;
    } 
    for(var n = ey*4*iw + 4*ox ; n < ey*4*iw + 4*(ex); n = n+4){
       pixels.data[n] = 0;
       pixels.data[n+1] = 0;
       pixels.data[n+2] = 0;
       pixels.data[n+3] = 255;
    }
    for(var n = oy*4*iw + 4*ox ; n < ey*4*iw + 4*ox; n = n+ 4*iw){
       pixels.data[n] = 0;
       pixels.data[n+1] = 0;
       pixels.data[n+2] = 0;
       pixels.data[n+3] = 255;
    }
    for(var n = oy*4*iw + 4*ex ; n < ey*4*iw + 4*ex; n = n+ 4*iw){
       pixels.data[n] = 0;
       pixels.data[n+1] = 0;
       pixels.data[n+2] = 0;
       pixels.data[n+3] = 255;
    }
    return pixels;
}