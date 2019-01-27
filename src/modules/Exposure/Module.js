/*
* Changes the Image Exposure
*/

module.exports = function Brightness(options,UI){


    var output;

    function draw(input,callback,progressObj){

        options.exposure = parseInt(options.exposure) || 0;
        var exposure = Math.pow(2, options.exposure);
        progressObj.stop(true);
        progressObj.overrideFlag = true;

        /*
        In this case progress is handled by changepixel internally otherwise progressObj
        needs to be overriden and used
        For eg. progressObj = new SomeProgressModule()
        */

        var step = this;

        function changePixel(r, g, b, a){

            r = Math.min(255, r*exposure)
            g = Math.min(255, g*exposure)
            b = Math.min(255, b*exposure)
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
