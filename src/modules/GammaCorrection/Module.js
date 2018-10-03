module.exports = function Gamma(options,UI){

    var output;

    function draw(input,callback,progressObj){

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        function changePixel(r, g, b, a){
            var val = options.adjustment || 0.2;

            r = Math.pow(r / 255, val) * 255;
            g = Math.pow(g / 255, val) * 255;
            b = Math.pow(b / 255, val) * 255;

            return [r , g, b, a];
        }

        function output(image,datauri,mimetype){

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
