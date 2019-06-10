module.exports = function flipImage(oldPixels, pixels, axis) {
  var width = oldPixels.shape[0],
    height = oldPixels.shape[1];
  
  function copyPixel(x1, y1, x2, y2){
    pixels.set(x1, y1, 0, oldPixels.get(x2, y2, 0));
    pixels.set(x1, y1, 1, oldPixels.get(x2, y2, 1));
    pixels.set(x1, y1, 2, oldPixels.get(x2, y2, 2));
    pixels.set(x1, y1, 3, oldPixels.get(x2, y2, 3));
  }

  function flip(){
    if(axis.toLowerCase() == 'vertical'){
      for (var n=0; n < width; n++){
        for (var m=0; m < height; m++){
          copyPixel(n, m, n, height - m - 1);
        }
      }
    }
    else {
      for (var n=0; n < width; n++){
        for (var m=0; m < height; m++){
          copyPixel(n, m, width - n - 1, m);
        }
      }
    }
  }

  flip();
  return pixels;
};