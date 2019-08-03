module.exports = function Crop(input, options, callback) {
  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  var getPixels = require('get-pixels'),
    savePixels = require('save-pixels');

  options.x = parseInt(options.x) || defaults.x;
  options.y = parseInt(options.y) || defaults.y;

  getPixels(input.src, function(err, pixels){
    options.w = parseInt(options.w) || Math.floor(pixels.shape[0]);
    options.h = parseInt(options.h) || Math.floor(pixels.shape[1]);
    options.backgroundColor = options.backgroundColor || defaults.backgroundColor;
    var ox = options.x;
    var oy = options.y;
    var w = options.w;
    var h = options.h;
    var iw = pixels.shape[0]; //Width of Original Image
    var ih = pixels.shape[1]; //Height of Original Image
    var backgroundArray = [];
    backgroundColor = options.backgroundColor.substring(options.backgroundColor.indexOf('(') + 1, options.backgroundColor.length - 1); // extract only the values from rgba(_,_,_,_)
    backgroundColor = backgroundColor.split(',');
    for(var i = 0; i < w ; i++){
      backgroundArray = backgroundArray.concat([backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]]);
    }
    // var newarray = new Uint8Array(4*w*h);
    var array = [];
    for (var n = oy; n < oy + h; n++) {
      var offsetValue = 4 * w * n;
      if(n < ih){
        var start = n * 4 * iw + ox * 4;
        var end = n * 4 * iw + ox * 4 + 4 * w;
        var pushArray = Array.from(pixels.data.slice(start, end ));
        array.push.apply(array, pushArray);
      } else {
        array.push.apply(array, backgroundArray);
      }
    }
    
    var newarray = Uint8Array.from(array);
    pixels.data = newarray;
    pixels.shape = [w, h, 4];
    pixels.stride[1] = 4 * w;

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
      callback(datauri, options.format);
    });
  });
};
