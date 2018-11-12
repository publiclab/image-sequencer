module.exports = function Dynamic(options, UI, util) {

    options.x = options.x || 0;
    options.y = options.y || 0;
    options.offset = options.offset || -2;

    var output;

    // This function is called on every draw.
    function draw(input, callback, progressObj) {

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        // convert offset as string to int
        if(typeof options.offset === "string") options.offset = parseInt(options.offset);

        // save the pixels of the base image
        var baseStepImage = this.getStep(options.offset).image;
        var baseStepOutput = this.getOutput(options.offset);

        var getPixels = require('get-pixels');

        getPixels(input.src, function(err, pixels) {
            options.secondImagePixels = pixels;

            function changePixel(r1, g1, b1, a1, x, y) {

                // overlay
                var p = options.secondImagePixels;
                if (x >= options.x
                    && x < p.shape[0]
                    && y >= options.y
                    && y < p.shape[1])
                    return [
                        p.get(x, y, 0),
                        p.get(x, y, 1),
                        p.get(x, y, 2),
                        p.get(x, y, 3)
                    ];
                else
                    return [r1, g1, b1, a1];
            }

            function output(image, datauri, mimetype) {

                // This output is accessible by Image Sequencer
                step.output = { src: datauri, format: mimetype };

            }

            // run PixelManipulation on first Image pixels
            return require('../_nomodule/PixelManipulation.js')(baseStepOutput, {
                output: output,
                changePixel: changePixel,
                format: baseStepOutput.format,
                image: baseStepImage,
                inBrowser: options.inBrowser,
                callback: callback
            });
        });
    }

    return {
        options: options,
        draw: draw,
        output: output,
        UI: UI
    }
}
