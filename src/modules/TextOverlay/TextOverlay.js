const getPixels = require('get-pixels'),
  pixelSetter = require('../../util/pixelSetter.js');
module.exports = exports = function(pixels, options, url1, cb){
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.text = options.text || defaults.text;
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;
  options.font = options.font || defaults.font;
  options.color = options.color || defaults.color;
  options.size = options.size || defaults.size;

  const {JSDOM} = require('jsdom');
  const {window} = new JSDOM('<!doctype html><html><body></body></html>', {resources: 'usable'});
  
  const { createCanvas, createImageData } = require('canvas');

  const canvas = createCanvas(pixels.shape[0], pixels.shape[1]);
  var ctx = canvas.getContext('2d');
  var image = new window.Image();
  image.src = url1;
  image.onload = function(){
    
    // ctx.putImageData(new createImageData(new Uint8ClampedArray(url1.data), url1.shape[0], url1.shape[1]), 0, 0);
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = options.color;
    ctx.font = options.size + 'px ' + options.font;
    ctx.fillText(options.text, options.x, options.y);

    getPixels(canvas.toDataURL(), function (err, qrPixels) {
      if (err) {
        console.log('get-pixels error: ', err);
      }



      for (let x = 0; x < pixels.shape[0]; x++) {
        for (let y = 0; y < pixels.shape[1]; y++) {
          pixelSetter(
            x,
            y,
            [
              qrPixels.get(x, y, 0),
              qrPixels.get(x, y, 1),
              qrPixels.get(x, y, 2),
              qrPixels.get(x, y, 3)
            ],
            pixels
          );
        }
      }
      if (cb) cb();
    });
  };

  

  
};