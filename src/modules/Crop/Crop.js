module.exports = function Crop(input,options,callback) {

  var getPixels = require('get-pixels'),
      savePixels = require('save-pixels');

  getPixels(input.src,function(err,pixels){
    var ox = options.x || 0;
    var oy = options.y || 0;
    var w = options.w || Math.floor(0.5*pixels.shape[0]);
    var h = options.h || Math.floor(0.5*pixels.shape[1]);
    var iw = pixels.shape[0]; //Width of Original Image
    var ih = pixels.shape[1]; //Height of Original Image
    var newarray = new Uint8Array(4*w*h);
    for (var n = oy; n < oy + h; n++) {
      newarray.set(pixels.data.slice(n*4*iw + ox, n*4*iw + ox + 4*w),4*w*(n-oy));
    }
    pixels.data = newarray;
    pixels.shape = [w,h,4];
    pixels.stride[1] = 4*w;

    Object.assign(options.metadata,{
      x:ox,y:oy,w:w,h:h,original_w:iw,original_h:ih
    });

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
