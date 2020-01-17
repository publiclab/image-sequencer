module.exports = exports = function(pixels, options, priorstep){

  var $ = require('jquery'); // to make text-overlay work for node.js

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  options.text = options.text || defaults.text;
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;
  options.font = options.font || defaults.font;
  options.color = options.color || defaults.color;
  options.size = options.size || defaults.size;
  console.log(priorstep);
  var img = $(priorstep.imgElement);
  console.log(img[0]);
  if(Object.keys(img).length === 0){
    img = $(priorstep.options.step.imgElement);
  }
  const {createCanvas} = require('canvas');
  console.log(img[0]);
  const canvas = createCanvas(pixels.shape[0], pixels.shape[1]);

  const ctx = canvas.getContext('2d');

  ctx.drawImage(img[0], 0, 0);
  ctx.fillStyle = options.color;
  ctx.font = options.size + 'px ' + options.font;
  ctx.fillText(options.text, options.x, options.y);

  var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixels.data = myImageData.data;
  return pixels;
};