module.exports = function flipImage(oldPixels, pixels, axis) {
  const pixelSetter = require('../../util/pixelSetter.js');

  var width = oldPixels.shape[0],
    height = oldPixels.shape[1];
  
  function copyPixel(x1, y1, x2, y2){
    pixelSetter(x1, y1, [oldPixels.get(x2, y2, 0), oldPixels.get(x2, y2, 1), oldPixels.get(x2, y2, 2), oldPixels.get(x2, y2, 3)], pixels);
    
  }

  function flip(){
    if(axis.toLowerCase() == 'vertical'){
      for (var n = 0; n < width; n++){
        for (var m = 0; m < height; m++){
          copyPixel(n, m, n, height - m - 1);
        }
      }
    }
    else {
      for (var n = 0; n < width; n++){
        for (var m = 0; m < height; m++){
          copyPixel(n, m, width - n - 1, m);
        }
      }
    }
  }

  flip();
  return pixels;
};