const testModule = require('../templates/module-test.1'),
  image = require('../images/IS-QR'),
  options = {
    exposure: 3
  };

testModule('exposure', options, image);