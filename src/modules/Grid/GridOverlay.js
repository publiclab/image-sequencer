module.exports = exports = function(pixels, options,priorstep){
    var defaults = require('../../util/getDefaults.js')(require('./info.json'));

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = pixels.shape[0]; //img.width();
    canvas.height = pixels.shape[1]; //img.height();
    for (var x = 0.5; x < canvas.width; x += 10) {
    context.moveTo(x, 0);
    context.lineTo(x, 381);
    }

    for (var y = 0.5; y < canvas.height; y += 10) {
    context.moveTo(0, y);
    context.lineTo(canvas.height, y);
    }

    context.strokeStyle = "#ddd";
    context.stroke();

    return pixels;
}