var test = require('tape');

var red = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z';

var parseCornerCoordinateInputs = require('../../../src/util/ParseInputCoordinates');


test('parseCornerCoordinateInputs works.', function (t) {
  var options = { x: '10%' },
    coord = { src: red, x: { valInp: options.x, type: 'horizontal' } };
  callback = function (options, coord) {
    options.x = parseInt(coord.x.valInp);
    t.equal(options.x, 1, 'parseCornerCoordinateInputs works.');
    t.end();
  };
  parseCornerCoordinateInputs(options, coord, callback);
});
