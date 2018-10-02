/*
 * Average all pixel colors
 */
module.exports = function Average(options, UI) {

    options.blur = options.blur || 2
    var output;

    options.step.metadata = options.step.metadata || {};

    function draw(input, callback, progressObj) {

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        function changePixel(r, g, b, a) {
            return [r, g, b, a]
        }

        // do the averaging
        function extraManipulation(pixels) {


            for (var i = 0; i < pixels.data.length; i += 1) {
                var avg = (pixels.data[i].getRed() + pixels.data[i].getGreen() + pixels.data[i].getBlue()) / 3;
                pixels.data[i].setRed(avg);
                pixels.data[i].setGreen(avg);
                pixels.data[i].setBlue(avg);
            }
            // TODO: Convert image to grayscale as per https://github.com/publiclab/image-sequencer/issues/369

            return pixels;
        }

        function output(image, datauri, mimetype) {

            // This output is accessible by Image Sequencer
            step.output = {
                src: datauri,
                format: mimetype
            };
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