const testModule = require('../templates/module-test.1'),
  image = require('../images/IS-QR'),
  options = {
    x: '20',
    y: '15',
    w: '40',
    h: '45'
  };

testModule('crop', options, image);