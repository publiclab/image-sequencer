module.exports = exports = function(pixels, options,priorstep){
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.text = options.text || defaults.text;
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;
  options.font = options.font || defaults.font;
  options.color = options.color || defaults.color;
  options.size = options.size || defaults.size;

  var img = $(priorstep.imgElement);
  if(Object.keys(img).length === 0){
    img = $(priorstep.options.step.imgElement);
  }
  var canvas = document.createElement('canvas');
  canvas.width = pixels.shape[0]; //img.width();
  canvas.height = pixels.shape[1]; //img.height();
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img[0], 0, 0);
  ctx.fillStyle = options.color;
  ctx.font = options.size +'px ' + options.font;
  ctx.fillText(options.text, options.x, options.y);

  var myImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  pixels.data = myImageData.data;
  return pixels;
};