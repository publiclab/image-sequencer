/*
* Average all pixel colors
*/
module.exports = function Average(options, UI){

    var output;

    options.step.metadata = options.step.metadata || {};

    function draw(input,callback,progressObj){

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        function changePixel(r, g, b, a){
            return [r,g,b,a]
        }

        // do the averaging
        function extraManipulation(pixels){
            var sum = [0,0,0,0];
            for (var i = 0; i < pixels.data.length; i += 4) {
              sum[0] += pixels.data[i + 0];
              sum[1] += pixels.data[i + 1];
              sum[2] += pixels.data[i + 2];
              sum[3] += pixels.data[i + 3];
            }

            sum[0] = parseInt(sum[0] / (pixels.data.length / 4));
            sum[1] = parseInt(sum[1] / (pixels.data.length / 4));
            sum[2] = parseInt(sum[2] / (pixels.data.length / 4));
            sum[3] = parseInt(sum[3] / (pixels.data.length / 4));

            for (var i = 0; i < pixels.data.length; i += 4) {
              pixels.data[i + 0] = sum[0];
              pixels.data[i + 1] = sum[1];
              pixels.data[i + 2] = sum[2];
              pixels.data[i + 3] = sum[3];
            }
            // report back and store average in metadata:
            options.step.metadata.averages = sum;
            console.log("average: ", sum);
            // TODO: refactor into a new "display()" method as per https://github.com/publiclab/image-sequencer/issues/242
            if (options.step.inBrowser && options.step.ui) $(options.step.ui).find('.details').append("<p><b>Averages</b> (r, g, b, a): " + sum.join(', ') + "</p>");
            return pixels;
        }

        function output(image, datauri, mimetype){

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
        draw:  draw,
        output: output,
        UI: UI
    }
}
