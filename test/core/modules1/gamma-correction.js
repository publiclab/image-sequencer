const testModule = require('../templates/module-test.1'),
  image = require('../images/IS-QR'),
  options = {
    adjustment: 0.6
  };
testModule('gamma-correction', options, image);