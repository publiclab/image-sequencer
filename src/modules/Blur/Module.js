/*
* Blur an Image
*/
module.exports = function Blur(options, UI) {

    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    options.blur = options.blur || defaults.blur;
    var output;

    function draw(input, callback, progressObj) {

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        function changePixel(r, g, b, a) {
            return [r, g, b, a]
        }

        function extraManipulation(pixels) {
            pixels = require('./Blur')(pixels, options.blur)
            return pixels
        }

        function output(image, datauri, mimetype) {

            // This output is accessible by Image Sequencer
            step.output = { src: datauri, format: mimetype };

        }

        return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
            changePixel: changePixel,
            extraManipulation: extraManipulation,
            format: input.format,
            image: options.image,
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
