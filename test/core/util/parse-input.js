var test = require('tape');

var parseCornerCoordinateInputs = require('../../../src/util/ParseInputCoordinates');


test('parseCornerCoordinateInputs works.', function (t) {
  var options = { x: '10%', iw: 10, ih: 10 },
    coord = { x: { valInp: options.x, type: 'horizontal' } };

  callback = function (options, coord) {
    options.x = parseInt(coord.x.valInp);
    t.equal(options.x, 1, 'parseCornerCootesrdinateInputs Works.');
    t.equal(typeof options.x, 'number', 'Correct output type');
    t.end();
  };

  parseCornerCoordinateInputs(options, coord, callback);
});
