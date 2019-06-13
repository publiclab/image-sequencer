module.exports = exports = function(pixels, options){
  var color = options.color || '228 86 81';
  var replaceColor = options.replaceColor || '0 0 255';
  var replaceMethod = options.replaceMethod || 'greyscale';
  color = color.split(' ');
  replaceColor = replaceColor.split(' ');


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
          pixels.set(i, j, 0, avg);
          pixels.set(i, j, 1, avg);
          pixels.set(i, j, 2, avg);
        }else {
          pixels.set(i, j, 0, replaceColor[0]);
          pixels.set(i, j, 1, replaceColor[1]);
          pixels.set(i, j, 2, replaceColor[2]);
        }
      }
    }
  }
  return pixels;
};