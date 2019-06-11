const testModule = require('../templates/module-test.1'),
  image = require('../images/IS-QR'),
  options = {
    startingX: 15,
    startingY: 20,
    fillColor: '80 180 80 255',
    tolerance: 20
  };

testModule('paint-bucket', options, image);