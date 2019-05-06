module.exports = function Convolution(options, UI) {

    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

    options.kernelValues = options.kernelValues || defaults.kernelValues;
    options.constantFactor = options.constantFactor || defaults.constantFactor;
    options.texMode = options.texMode || defaults.texMode;
    var output;

    function draw(input, callback, progressObj) {

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        function extraManipulation(pixels) {
            pixels = require('./Convolution')(pixels, options.constantFactor, options.kernelValues, options.texMode);
            return pixels;
        }

        function output(image, datauri, mimetype) {

            step.output = { src: datauri, format: mimetype };

        }

        return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
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
