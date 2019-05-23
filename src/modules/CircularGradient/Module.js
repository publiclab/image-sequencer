module.exports = function Gradient(options, UI) {

  var output;

  // The function which is called on every draw.
  function draw(input, callback, progressObj) {
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
          var distX = Math.abs((pixels.shape[0]/2) - i);
          var distY = Math.abs((pixels.shape[1]/2) - j);
          var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
          brightness = 255 * (distance / pixels.shape[0]);
          pixels.set(i, j, 0, brightness);
          pixels.set(i, j, 1, brightness);
          pixels.set(i, j, 2, brightness);
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
