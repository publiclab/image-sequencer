module.exports = function Shadow(options, UI) {

    var output;

    // The function which is called on every draw.
    function draw(input, callback, progressObj) {
        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        let defaults = require('./../../util/getDefaults.js')(require('./info.json'));
        let shadowDimension = options.shadowDimension || defaults.shadowDimension;
        shadowDimension = shadowDimension.split(" ");
        var firstValue = shadowDimension[0];
        var secondValue = shadowDimension[1];
        console.log(firstValue, secondValue);

        const getPixels = require("get-pixels");

        getPixels(input.src, function(err, pixels) {
            console.log("nirav");
            if (options.preProcess) pixels = options.preProcess(pixels); // Allow for preprocessing
            var pixelsArray = [];
            var i = 0;
            var pixel = [];
            for (var x = 0; x < pixels.shape[0]; x++) {
                for (var y = 0; y < pixels.shape[1]; y++) {
                    pixelsArray[i+0] = pixels.get(x, y, 0);
                    pixelsArray[i+1] = pixels.get(x, y, 1);
                    pixelsArray[i+2] = pixels.get(x, y, 2);
                    pixelsArray[i+3] = pixels.get(x, y, 3);
                    i+=4;
                }
            }
            console.log("asher");
            console.log(pixelsArray);
            i = 0;
            for (var x = pixels.shape[0]; x > 0; x--) {
                for (var y = pixels.shape[1]; y > 0; y--) {
                    pixels.set(x-firstValue, y-secondValue, 0, pixelsArray[i+0]);
                    pixels.set(x-firstValue, y-secondValue, 1, pixelsArray[i+1]);
                    pixels.set(x-firstValue, y-secondValue, 2, pixelsArray[i+2]);
                    pixels.set(x-firstValue, y-secondValue, 3, pixelsArray[i+3]);
                    i+=4;
                    if (!options.inBrowser && !process.env.TEST) pace.op();
                }
            }
            function extraManipulation(pixels) {
                pixels = require('./shadow')(pixels, options)
                return pixels
            };
            return require('../_nomodule/PixelManipulation.js')(input, {
                output: output,
                extraManipulation: extraManipulation,
                format: input.format,
                image: options.image,
                inBrowser: options.inBrowser,
                callback: callback
            });
        });

        function output(image, datauri, mimetype) {
            // This output is accessible by Image Sequencer
            step.output = { src: datauri, format: mimetype };
        }
    }

    return {
        options: options,
        draw: draw,
        output: output,
        UI: UI
    }
}
