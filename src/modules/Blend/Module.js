module.exports = function Dynamic(options, UI, util) {

    options.func = options.func || "function(r1, g1, b1, a1, r2, g2, b2, a2) { return [ r1, g2, b2, a2 ] }";
    options.offset = options.offset || -2;

    var output;

    // This function is called on every draw.
    function draw(input, callback, progressObj) {

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        // convert to runnable code:
        if (typeof options.func === "string") eval('options.func = ' + options.func);

        var getPixels = require('get-pixels');

        // convert offset as string to int
        if(typeof options.offset === "string") options.offset = parseInt(options.offset);

        // save first image's pixels
        var priorStep = this.getStep(options.offset);

        getPixels(priorStep.output.src, function(err, pixels) {
            options.firstImagePixels = pixels;

            function changePixel(r2, g2, b2, a2, x, y) {
                // blend!
                var p = options.firstImagePixels;
                return options.func(
                    r2, g2, b2, a2,
                    p.get(x, y, 0),
                    p.get(x, y, 1),
                    p.get(x, y, 2),
                    p.get(x, y, 3)
                )
            }

            function output(image, datauri, mimetype) {

                // This output is accessible by Image Sequencer
                step.output = { src: datauri, format: mimetype };

            }

            // run PixelManipulatin on second image's pixels
            return require('../_nomodule/PixelManipulation.js')(input, {
                output: output,
                changePixel: changePixel,
                format: input.format,
                image: options.image,
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
