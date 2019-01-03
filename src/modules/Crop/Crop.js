module.exports = function Crop(input,options,callback) {

  var getPixels = require('get-pixels'),
      savePixels = require('save-pixels');

  options.x = parseInt(options.x) || 0;
  options.y = parseInt(options.y) || 0;

  getPixels(input.src,function(err,pixels){
    options.w = parseInt(options.w) || Math.floor(pixels.shape[0]);
    options.h = parseInt(options.h) || Math.floor(pixels.shape[1]);
    options.backgroundColor = options.backgroundColor || '255 255 255 255';
    var ox = options.x;
    var oy = options.y;
    var w = options.w;
    var h = options.h;
    var iw = pixels.shape[0]; //Width of Original Image
    var ih = pixels.shape[1]; //Height of Original Image
    var backgroundArray = [];
    backgroundColor = options.backgroundColor.split(" ");
    for(var i = 0; i < w ; i++){
      backgroundArray = backgroundArray.concat([backgroundColor[0],backgroundColor[1],backgroundColor[2],backgroundColor[3]]);
    }
    var newarray = new Uint8Array(4*w*h);
    for (var n = oy; n < oy + h; n++) {
      if(n<ih){
      newarray.set(pixels.data.slice(n*4*iw + ox, n*4*iw + ox + 4*w),4*w*(n-oy));
      } else {
        newarray.set(backgroundArray,4*w*(n-oy));
      }
    }
    pixels.data = newarray;
    pixels.shape = [w,h,4];
    pixels.stride[1] = 4*w;

    options.format = input.format;

    var chunks = [];
    var totalLength = 0;
    var r = savePixels(pixels, options.format);

    r.on('data', function(chunk){
      totalLength += chunk.length;
      chunks.push(chunk);
    });

    r.on('end', function(){
      var data = Buffer.concat(chunks, totalLength).toString('base64');
      var datauri = 'data:image/' + options.format + ';base64,' + data;
      callback(datauri,options.format);
    });
  });
};
