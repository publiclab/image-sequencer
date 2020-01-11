module.exports = exports = function(pixels, options){
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.text = options.text || defaults.text;
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;
  options.font = options.font || defaults.font;
  options.color = options.color || defaults.color;
  options.size = options.size || defaults.size;

  var canvas = document.createElement('canvas');
  canvas.width = pixels.shape[0]; //img.width();
  canvas.height = pixels.shape[1]; //img.height();
  var ctx = canvas.getContext('2d');

  ctx.putImageData(new ImageData(new Uint8ClampedArray(pixels.data), pixels.shape[0], pixels.shape[1]), 0, 0);

  ctx.fillStyle = options.color;
  ctx.font = options.size + 'px ' + options.font;
  ctx.fillText(options.text, options.x, options.y);

  var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixels.data = new Uint8Array(myImageData.data);
  return pixels;
};