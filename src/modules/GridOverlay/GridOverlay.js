module.exports = exports = function(pixels, options){
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  if(Number(options.x)==0){
    options.x = 1;
  } 
  if( Number(options.y)==0) {
    options.y =1;
  }

  options.x = Math.abs(Number(options.x)) || defaults.x;
  options.y = Math.abs(Number(options.y)) || defaults.y;
  color = options.color || defaults.color;
  color = color.substring(color.indexOf('(') + 1, color.length - 1); // extract only the values from rgba(_,_,_,_)
  color = color.split(',');

  for(var x = 0; x < pixels.shape[0]; x += options.x){
    for(var y = 0 ; y < pixels.shape[1]; y++){
      pixels.set(x, y, 0, color[0]);
      pixels.set(x, y, 1, color[1]);
      pixels.set(x, y, 2, color[2]);
      //pixels.set(x, y, 3, color[3]);
    }
  }
    
  for(var y = 0; y < pixels.shape[1]; y += options.y){
    for(var x = 0 ; x < pixels.shape[0]; x++){
      pixels.set(x, y, 0, color[0]);
      pixels.set(x, y, 1, color[1]);
      pixels.set(x, y, 2, color[2]);
      //pixels.set(x, y, 3, color[3]);
    }
  }

  return pixels;
};
