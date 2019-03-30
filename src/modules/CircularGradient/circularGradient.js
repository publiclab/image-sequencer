module.exports = exports = function(pixels, options) {

    let defaults = require('./../../util/getDefaults.js')(require('./info.json'));

    let fillColor = options.fillColor || defaults.fillColor;
    options.centreX = options.centreX || defaults.centreX;
    options.centreY = options.centreY || defaults.centreY;

    var width = pixels.shape[0];
    var height = pixels.shape[1];
    if(height%2 != 0) {
        height = height-1;
    }
    if(width%2 != 0) {
        width = width-1;
    }
    var increment = width/2;
    console.log(width);
    console.log(height);

    fillColor = fillColor.split(" ")

    for (var i = 0 ; i < width ; i++) {
        for (var j = 0 ; j < height ; j++) {
            var distX = Math.abs(options.centreX - i);
            var distY = Math.abs(options.centreY - j);
            var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
            var brightness = 255 * (distance / (2*width));
            if (distance-1 > width) {distance = width;}
            pixels.set(i, j, 0, fillColor[0]*1.5*distance/width);
            pixels.set(i, j, 1, fillColor[1]*1.5*distance/width);
            pixels.set(i, j, 2, fillColor[2]*1.5*distance/width);
            pixels.set(i, j, 3, 255);
        }
    }
    return pixels
}
