module.exports = function MinifyImage(options, UI) {
  var output;
  if (!options.inBrowser) {
    base64Img = require('base64-img');
    imagemin = require('imagemin');
    imageminJpegtran = require('imagemin-jpegtran');
    imageminPngquant = require('imagemin-pngquant');
  }

  function draw(input, callback, progressObj) {
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], {
        type: mimeString
      });
      return blob;

    }
    if (options.inBrowser) {
      var Compressor = require('compressorjs');
      var blob = dataURItoBlob(input.src);
      new Compressor(blob, {
        quality: options.quality || 0.5,
        success(result) {
          var reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = function () {
            base64data = reader.result;
            output(null, base64data, input.format, false);
            if (callback) callback();
            return;
          };
          
        },
        error(err) {
          console.log(err.message);
        },
      });

    }
    else{
      let filePath = __dirname + '/images/';
      var returnPath = base64Img.imgSync(input.src, filePath, 'test');
      (async () => {
        const files = await imagemin([returnPath], {
          destination: __dirname + '/results/',
          plugins: [
            imageminJpegtran(),
            imageminPngquant({
              quality: [0.6, 0.8]
            })
          ]
        });
        var destPath = __dirname + '/results/test.' + input.format;
        var data = base64Img.base64Sync(destPath);
        output(null, data, input.format, false);
        if (callback) callback();
      })().catch(e => console.log(e));
    }


    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
    }
  }
  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};


