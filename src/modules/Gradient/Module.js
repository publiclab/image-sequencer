module.exports = function Invert(options, UI) {
  const pixelSetter = require('../../util/pixelSetter.js');

  var output;

  // The function which is called on every draw.
  function draw(input, callback) {

    var getPixels = require('get-pixels');
    var savePixels = require('save-pixels');

    var step = this;

    getPixels(input.src, function(err, pixels) {

      if (err) {
        console.log('Bad Image path');
        return;
      }

      var width = pixels.shape[0];

      for (var i = 0; i < pixels.shape[0]; i++) {
        for (var j = 0; j < pixels.shape[1]; j++) {
          let val = (i / width) * 255;
          pixelSetter(i, j, [val, val, val, 255], pixels);
                
        }
      }
      var chunks = [];
      var totalLength = 0;
      var r = savePixels(pixels, input.format, { quality: 100 });

      r.on('data', function(chunk) {
        totalLength += chunk.length;
        chunks.push(chunk);
      });

      r.on('end', function() {
        var data = Buffer.concat(chunks, totalLength).toString('base64');
        var datauri = 'data:image/' + input.format + ';base64,' + data;
        output(input.image, datauri, input.format);
        callback();
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
  };
};
