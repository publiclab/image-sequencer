module.exports = exports = function(pixels, options,priorstep){
    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

    options.color = options.color || defaults.color;
    options.x = options.x || defaults.x;
    options.y = options.y || defaults.y;

        var img = $(priorstep.imgElement);
        var canvas = document.createElement("canvas");
        canvas.width = pixels.shape[0]; //img.width();
        canvas.height = pixels.shape[1]; //img.height();
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img[0], 0, 0);
        var p=2;
        function drawBoard(){
            for (var x = 0; x <= canvas.width; x+=options.x) {
                ctx.moveTo(0.5 + x + p, p);
                ctx.lineTo(0.5 + x + p, canvas.height + p);
            }
            for (var y = 0; y <= canvas.height; y+=options.y) {
                ctx.moveTo(p, 0.5 + y + p);
                ctx.lineTo(canvas.width + p, 0.5 + y + p);
            }
            ctx.strokeStyle = options.color;
            ctx.stroke();
        }
        
        drawBoard();

    var myImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    pixels.data = myImageData.data
    return pixels;
}