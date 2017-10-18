// special module to load an image into the start of the sequence; used in the HTML UI
function LoadImage(ref, name, src, main_callback) {
  function makeImage(datauri) {
    var image = {
      src: datauri,
      format: datauri.split(':')[1].split(';')[0].split('/')[1]
    }
    return image;
  }
  function CImage(src, callback) {
    var datauri;
    if (!!src.match(/^data:/i)) {
      datauri = src;
      callback(datauri);
    }
    else if (!ref.options.inBrowser && !!src.match(/^https?:\/\//i)) {
      require( src.match(/^(https?):\/\//i)[1] ).get(src,function(res){
        var data = '';
        var contentType = res.headers['content-type'];
        res.setEncoding('base64');
        res.on('data',function(chunk) {data += chunk;});
        res.on('end',function() {
          callback("data:"+contentType+";base64,"+data);
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
        context.drawImage(image,0,0);
        datauri = canvas.toDataURL(ext);
        callback(datauri);
      }
      image.src = src;
    }
    else {
      datauri = require('urify')(src);
      callback(datauri);
    }
  }

  function loadImage(name, src) {
    var step = {
      name: "load-image",
      description: "This initial step loads and displays the original image without any modifications.",
      ID: ref.options.sequencerCounter++,
      imageName: name,
      inBrowser: ref.options.inBrowser,
      ui: ref.options.ui
    };

    var image = {
      src: src,
      steps: [{
        options: {
          id: step.ID,
          name: "load-image",
          description: "This initial step loads and displays the original image without any modifications.",
          title: "Load Image",
          step: step
        },
        UI: ref.events,
        draw: function() {
          UI.onDraw(options.step);
          if(arguments.length==1){
            this.output = CImage(arguments[0]);
            options.step.output = this.output;
            UI.onComplete(options.step);
            return true;
          }
          else if(arguments.length==2) {
            this.output = CImage(arguments[0]);
            options.step.output = this.output;
            arguments[1]();
            UI.onComplete(options.step);
            return true;
          }
          return false;
        },
      }]
    };
    CImage(src, function(datauri) {
      var output = makeImage(datauri);
      ref.images[name] = image;
      var loadImageStep = ref.images[name].steps[0];
      loadImageStep.output = output;
      loadImageStep.options.step.output = loadImageStep.output.src;
      loadImageStep.UI.onSetup(loadImageStep.options.step);
      loadImageStep.UI.onDraw(loadImageStep.options.step);
      loadImageStep.UI.onComplete(loadImageStep.options.step);

      main_callback();
      return true;
    });
  }

  return loadImage(name,src);
}

module.exports = LoadImage;
