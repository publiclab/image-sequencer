/*
* Changes the Image Brightness
*/

module.exports = function Brightness(options,UI){

    options.brightness = parseInt(options.brightness) || 100
    var val = (options.brightness)/100.0
    var output;

    function draw(input,callback,progressObj){

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        /*
        In this case progress is handled by changepixel internally otherwise progressObj
        needs to be overriden and used
        For eg. progressObj = new SomeProgressModule()
        */

        var step = this;

        function changePixel(r, g, b, a){

            r = 255 * Math.min(val, 1)
            g = 255 * Math.min(val, 1)
            b = 255 * Math.min(val, 1)
            return [r, g, b, a]
        }

        function output(image,datauri,mimetype){

            // This output is accessible by Image Sequencer
            step.output = {src:datauri,format:mimetype};

        }

        return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
            changePixel: changePixel,
            format: input.format,
            image: options.image,
            inBrowser: options.inBrowser,
            callback: callback
        });

    }
    return {
        options: options,
        draw:  draw,
        output: output,
        UI: UI
    }
}
