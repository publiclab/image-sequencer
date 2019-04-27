module.exports = exports = function(pixels, options){
    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

    options.x = Number(options.x) || defaults.x;
    options.y = Number(options.y) || defaults.y;
    color = options.color || defaults.color;
    color = color.split(" ");

        for(var x = 0; x < pixels.shape[0]; x+=options.x){
            for(var y = 0 ; y < pixels.shape[1]; y++){
                pixels.set(x, y, 0, color[0]);
                pixels.set(x, y, 1, color[1]);
                pixels.set(x, y, 2, color[2]);
                pixels.set(x, y, 3, color[3]);
            }
        }
    
        for(var y = 0; y < pixels.shape[1]; y+=options.y){
            for(var x = 0 ; x < pixels.shape[0]; x++){
                pixels.set(x, y, 0, color[0]);
                pixels.set(x, y, 1, color[1]);
                pixels.set(x, y, 2, color[2]);
                pixels.set(x, y, 3, color[3]);
            }
        } 

    return pixels;
}
