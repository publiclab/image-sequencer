// special module to load an image into the start of the sequence; used in the HTML UI
function LoadImage(ref, name, src, main_callback) {
  function makeImage(datauri) {
    var image = {
      src: datauri,
      format: datauri.split(':')[1].split(';')[0].split('/')[1]
    };
    return image;
  }
  function CImage(src, step, callback) {
    var datauri;
    if (src.match(/^data:/i)) {
      datauri = src;
      callback(datauri, step);
    }
    else if (!ref.options.inBrowser && !!src.match(/^https?:\/\//i)) {
      require(src.match(/^(https?):\/\//i)[1]).get(src, function(res) {
        var data = '';
        var contentType = res.headers['content-type'];
        res.setEncoding('base64');
        res.on('data', function(chunk) { data += chunk; });
        res.on('end', function() {
          callback('data:' + contentType + ';base64,' + data, step);
        });
      });
    }
    else if (ref.options.inBrowser) {
      var ext = src.split('.').pop();
      var image = document.createElement('img');
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      image.onload = function() {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        context.drawImage(image, 0, 0);
        datauri = canvas.toDataURL(ext);
        callback(datauri, step);
      };
      image.src = src;
    }
    else {
      datauri = require('urify')(src);
      callback(datauri, step);
    }
  }

  function loadImage(name, src) {
    var step = {
      name: 'load-image',
      description: 'This initial step loads and displays the original image without any modifications.',
      ID: ref.options.sequencerCounter++,
      inBrowser: ref.options.inBrowser,
      ui: ref.options.ui,
      UI: ref.events,
      output: ''
    };


    CImage(src, step, function(datauri, step) {
      var output = makeImage(datauri);
      ref.steps.push(step);
      ref.steps[0].output = output;
      ref.steps[0].UI.onSetup(ref.steps[0]);
      ref.steps[0].UI.onDraw(ref.steps[0]);
      ref.steps[0].UI.onComplete(ref.steps[0]);

      main_callback();
      return true;
    });
  }

  return loadImage(name, src);
}

module.exports = LoadImage;

