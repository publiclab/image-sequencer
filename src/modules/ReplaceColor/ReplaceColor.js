module.exports = exports = function(pixels, options){
  const pixelSetter = require('../../util/pixelSetter.js');

  var color = options.color || 'rgb(228,86,81)';
  color = color.substring(color.indexOf('(') + 1, color.length - 1); // extract only the values from rgba(_,_,_,_)

  var replaceColor = options.replaceColor || 'rgb(0,0,255)';
  replaceColor = replaceColor.substring(replaceColor.indexOf('(') + 1, replaceColor.length - 1); // extract only the values from rgba(_,_,_,_)

  var replaceMethod = options.replaceMethod || 'greyscale';
  color = color.split(',');
  replaceColor = replaceColor.split(',');


  var cr = color[0],
    cg = color[1],
    cb = color[2];

  var tolerance = options.tolerance || 50;
  var maxFactor = (1 + tolerance / 100);
  var minFactor = (1 - tolerance / 100);

  function isSimilar(r, g, b){
    return ( r >= cr * minFactor &&  r <= cr * maxFactor &&
                 g >= cg * minFactor &&  g <= cg * maxFactor &&
                 b >= cb * minFactor &&  b <= cb * maxFactor);
  }
  for(var i = 0; i < pixels.shape[0]; i++){
    for(var j = 0; j < pixels.shape[1]; j++){
      var r = pixels.get(i, j, 0),
        g = pixels.get(i, j, 1),
        b = pixels.get(i, j, 2);
      if(isSimilar(r, g, b)){
        if (replaceMethod == 'greyscale'){
          var avg = (r + g + b) / 3;
          pixelSetter(i, j, [avg, avg, avg], pixels);

        }else {
          pixelSetter(i, j, replaceColor, pixels);

        }
      }
    }
    
    
  }
  return pixels;
};