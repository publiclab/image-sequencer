module.exports = function Balance(options, UI) {

    var output;

    function draw (input, callback, progressObj) {

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        function changePixel(r, g, b, a) {
            return [r, g, b ,a]
        }

        function extraManipulation(pixels) {

            let r = g = b = 0;
            let count = 0;

            for(let i=0; i<pixels.shape[0]; i++) {
              for (let j=0; j<pixels.shape[1]; j++) {
                  r += pixels.get(i,j,0)
                  g += pixels.get(i,j,1)
                  b += pixels.get(i,j,2)
                  count++
              }
            }
            let avg_r = r/count
            let avg_g = g/count
            let avg_b = b/count

            let average = [avg_r, avg_g, avg_b]
            let max = Math.max(...average)
            let balance = average.map( channel => (255*channel)/max )
            console.log(balance)

            let red_balance = balance[0]
            let green_balance = balance[1]
            let blue_balance = balance[2]

            for(let i=0; i<pixels.shape[0]; i++) {
              for (let j=0; j<pixels.shape[1]; j++) {

                  r_data = pixels.get(i,j,0)
                  r_new_data = (255/red_balance) ** .45 * r_data
                  pixels.set(i,j,0,r_new_data)

                  g_data = pixels.get(i,j,1)
                  g_new_data = (255/green_balance) ** .45 * g_data
                  pixels.set(i,j,1,g_new_data)

                  b_data = pixels.get(i,j,2)
                  b_new_data = (255/blue_balance) ** .45 * b_data
                  pixels.set(i,j,2,b_new_data)
              }
            }

          return pixels
        }

        function output (image, datauri, mimetype){

            step.output = {src:datauri,format:mimetype};

        }

        return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
            changePixel: changePixel,
            extraManipulation: extraManipulation,
            format: input.format,
            image: options.image,
            inBrowser: options.inBrowser,
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