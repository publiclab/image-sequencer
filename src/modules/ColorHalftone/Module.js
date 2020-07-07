/*
* Generate halftone versions of CMYK channels and blend them with varying rotations as in analog print color separation processes.
* Simulates a CMYK halftone rendering of the image by multiplying pixel values with a four rotated 2D sine wave patterns, one each for cyan, magenta, yellow, and black.
* http://evanw.github.io/glfx.js/docs/#colorHalftone
*/
module.exports = function ColorHalftone(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  var output;
  var fx = require('glfx');

  var dataURItoBlob = function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

  var canvasToBlobUrl = function canvasToBlobUrl(canvas) {

    var blob = dataURItoBlob(canvas.toDataURL('image/png'));
    return window.URL.createObjectURL(blob);

  };

  var colorHalftone = function colorHalftone(id, options, download) {

    // try to create a WebGL canvas (will fail if WebGL isn't supported)
    try {
      var canvas = fx.canvas(1500, 1500);
    } catch (e) {
      alert(e);
      return;
    }

    // convert the image to a texture
    var imageEl = document.getElementById(id);

    var image = new Image();

    image.onload = function() {

      var texture = canvas.texture(image);

      canvas.draw(texture,
        image.width, //  * ratio,
        image.height// * ratio
      );

      canvas.colorHalftone(
        image.width / 2,
        image.height / 2,
        parseFloat(options.angle),
        parseFloat(options.size)
      ).update();

      var burl = canvasToBlobUrl(canvas);

      if (download) {

        window.open(burl);

      } else { // replace the image

        // keep non-blob version in case we have to fall back:
        // image.src = canvas.toDataURL('image/png');
        // window.location = canvas.toDataURL('image/png');
        imageEl.src = burl;

      }

    };

    $(image).hide();
    image.src = imageEl.src;

  };

  function draw(input, callback) {

    var step = this;

    options.angle = options.angle || defaults.angle;
    options.size = options.size || defaults.size;

    if (!options.inBrowser) {
      // this.output = input;
      // callback();
      require('../_nomodule/gl-context')(input, callback, step, options);
    }
    else {
      var image = document.createElement('img');
      image.onload = () => {
        colorHalftone(
          'img',
          options
        );
        image.onload = () => {
          var canvas = document.createElement('canvas');
          canvas.width = image.naturalWidth; // or 'width' if you want a special/scaled size
          canvas.height = image.naturalHeight; // or 'height' if you want a special/scaled size
          canvas.getContext('2d').drawImage(image, 0, 0);

          step.output = { src: canvas.toDataURL('image/png'), format: 'png' };
          image.remove();
          callback();
        };
      };
      image.src = input.src;
      image.id = 'img';
      document.body.appendChild(image);
    }
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
