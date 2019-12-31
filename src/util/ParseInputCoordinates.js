module.exports = function parseCornerCoordinateInputs(options, coord, callback) {
  const {iw, ih} = options;

  function convert(key) {
    var val = coord[key];

    val.valInp = val.valInp.toString();
    val.valInp = val.valInp.replace(/[\)\(]/g, '');

    if (val.valInp && val.valInp.slice(-1) === '%') {
      val.valInp = val.valInp.replace('%', '');

      val.valInp = parseInt(val.valInp);

      if (val.type === 'horizontal') val.valInp = val.valInp * iw / 100;
      else val.valInp = val.valInp * ih / 100;
    }
    else val.valInp = parseInt(val.valInp);
  }

  Object.keys(coord).forEach(convert);
  callback(options, coord);
};