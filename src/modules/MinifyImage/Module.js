
module.exports = function MinifyImage(options, UI) {
  var output;
  var base64Img = require('base64-img');
  const imagemin = require('imagemin');
  const imageminJpegtran = require('imagemin-jpegtran');
  const imageminPngquant = require('imagemin-pngquant');

  function draw(input, callback, progressObj) {
    console.log('draw');
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;
    let filePath =  './images/';
    var returnPath = base64Img.imgSync(input.src, filePath, 'test');
    (async () => {
      const files = await imagemin([returnPath], {
        destination: './results/',
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8]
          })
        ]
      });
      var destPath = './results/test.' + input.format;
      var data = base64Img.base64Sync(destPath);
      output(data, input.format );
      if(callback) callback();
    })();


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