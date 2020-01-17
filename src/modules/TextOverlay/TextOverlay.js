module.exports = exports = function(pixels, options){
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.text = options.text || defaults.text;
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;
  options.font = options.font || defaults.font;
  options.color = options.color || defaults.color;
  options.size = options.size || defaults.size;

  const {createCanvas, createImageData} = require('canvas');

  const canvas = createCanvas(pixels.shape[0], pixels.shape[1]);

  const ctx = canvas.getContext('2d');

  ctx.putImageData(new createImageData(new Uint8ClampedArray(pixels.data), pixels.shape[0], pixels.shape[1]), 0, 0);

  ctx.fillStyle = options.color;
  ctx.font = options.size + 'px ' + options.font;
  ctx.fillText(options.text, options.x, options.y);

  var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixels.data = new Uint8Array(myImageData.data);
  return pixels;
};