module.exports = function parseCornerCoordinateInputs(options,coord,callback) {
  var getPixels = require('get-pixels');
  getPixels(coord.src, function(err, pixels) {
    var iw = pixels.shape[0],
      ih = pixels.shape[1];
    if (!coord.x.valInp) {
      return;
    }
    else {
      Object.keys(coord).forEach(convert);
      function convert(key) {
        var val = coord[key];
        if (val.valInp && val.valInp.slice(-1) === '%') {
          val.valInp = parseInt(val.valInp, 10);
          if (val.type === 'horizontal')
            val.valInp = val.valInp * iw / 100;
          else
            val.valInp = val.valInp * ih / 100;
        }
      }
    }
    callback(options, coord);
  });
};