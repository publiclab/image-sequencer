/*
* General purpose per-pixel manipulation
* accepting a changePixel() method to remix a pixel's channels
*/
module.exports = function PixelManipulation(image, options) {
  
  options = options || {};
  options.changePixel = options.changePixel || function changePixel(r, g, b, a) {
    return [r, g, b, a];
  };
  options.extraManipulation = options.extraManipulation||function extraManipulation(pixels){
    return pixels;
  }
  
  var getPixels = require('get-pixels'),
  savePixels = require('save-pixels');
  
  getPixels(image.src, function(err, pixels) {
    
    if(err) {
      console.log('Bad image path');
      return;
    }
    
    // iterate through pixels;
    // this could possibly be more efficient; see
    // https://github.com/p-v-o-s/infragram-js/blob/master/public/infragram.js#L173-L181
    
    if(!options.inBrowser)
    var pace = require('pace')((pixels.shape[0] * pixels.shape[1]))
    
    for(var x = 0; x < pixels.shape[0]; x++) {
      for(var y = 0; y < pixels.shape[1]; y++) {

        if(options.getNeighbourPixel){
          var pixel = options.changePixel(
            pixels.get(x, y, 0),
            pixels.get(x, y, 1),
            pixels.get(x, y, 2),
            pixels.get(x, y, 3),
            function (distX,distY) { 
              return options.getNeighbourPixel(pixels,x,y,distX,distY);
            }
          );
        }
        else{
          var pixel = options.changePixel(
            pixels.get(x, y, 0),
            pixels.get(x, y, 1),
            pixels.get(x, y, 2),
            pixels.get(x, y, 3)
          );
        }
        
        pixels.set(x, y, 0, pixel[0]);
        pixels.set(x, y, 1, pixel[1]);
        pixels.set(x, y, 2, pixel[2]);
        pixels.set(x, y, 3, pixel[3]);
        
        if(!options.inBrowser)
        pace.op()
      }
    }
    
    if(options.extraManipulation)
    pixels = options.extraManipulation(pixels)
    
    // there may be a more efficient means to encode an image object,
    // but node modules and their documentation are essentially arcane on this point
    var chunks = [];
    var totalLength = 0;
    var r = savePixels(pixels, options.format, {quality: 100});
    
    r.on('data', function(chunk){
      totalLength += chunk.length;
      chunks.push(chunk);
    });
    
    r.on('end', function(){
      var data = Buffer.concat(chunks, totalLength).toString('base64');
      var datauri = 'data:image/' + options.format + ';base64,' + data;
      if (options.output) options.output(options.image,datauri,options.format);
      if (options.callback) options.callback();
    });
  });
};
