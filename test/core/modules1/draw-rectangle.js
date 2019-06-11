const testModule = require('../templates/module-test.1'),
  image = require('../images/IS-QR'),
  options = {
    startingX: 2,
    endX: 60,
    startingY: 2,
    endY: 60,
    color: '0 255 0 255',
    thickness: 6
  };
testModule('draw-rectangle', options, image);