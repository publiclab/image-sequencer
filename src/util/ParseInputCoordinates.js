module.exports = function parseCornerCoordinateInputs(options, coord, callback) {
  let {iw, ih} = options;
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
};