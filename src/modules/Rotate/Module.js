/*
 * Rotates image 
 */
module.exports = function Rotate(options, UI) {

    var output;

    function draw(input, callback, progressObj) {

        options.rotate = parseInt(options.rotate) || 0;

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        var imagejs = require('imagejs');

        function changePixel(r, g, b, a) {
            return [r, g, b, a]
        }

        function extraManipulation(pixels) {
            var rotate_value = (options.rotate)%360;

            if(rotate_value%360 == 0)
            return pixels;

            var bitmap = new imagejs.Bitmap({width: pixels.shape[0], height: pixels.shape[1]});
            bitmap._data.data = pixels.data;

            var rotated = bitmap.rotate({
                degrees: rotate_value, 
            });
            pixels.data = rotated._data.data;
            
            return pixels;
        }

        function output(image, datauri, mimetype) {
            // This output is accesible by Image Sequencer
            step.output = { src: datauri, format: mimetype };
        }

        return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
            changePixel: changePixel,
            extraManipulation: extraManipulation,
            format: input.format,
            image: options.image,
            inBrowser: options.inBrowser,
            callback: callback
        });
    }

    return {
        options: options,
        draw: draw,
        output: output,
        UI: UI
    }
}
