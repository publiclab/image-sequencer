/*
 * Average all pixel colors
 */
module.exports = function MinifyImage(options, UI) {

  var output;
  var imageDataURI = require('image-data-uri');
  const imagemin = require('imagemin');
  const imageminJpegtran = require('imagemin-jpegtran');
  const imageminPngquant = require('imagemin-pngquant');

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;
    let filePath = __dirname + '/images/test.' + input.format;
    imageDataURI.outputFile(input.src, filePath)
      .then(res =>{
        (async () => {
          var inputPath,
            inputPath = filePath;
          const files = await imagemin([inputPath], {
            destination: __dirname + '/results/',
            plugins: [
              imageminJpegtran(),
              imageminPngquant({
                quality: [0.6, 0.8]
              })
            ]
          });
          var destPath = __dirname + '/results/test.' + input.format;

          imageDataURI.encodeFromFile(destPath)
            .then(res => {
              output(res, input.format );
              if(callback) callback();
            });
        })();
      });

    function output( datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = {
        src: datauri,
        format: mimetype
      };
    }
  }
  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};