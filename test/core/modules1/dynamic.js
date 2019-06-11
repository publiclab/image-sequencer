const testModule = require('../templates/module-test.1'),
  image = require('../images/IS-QR'),
  options = {
    red: 'r * 2',
    blue: 'b * 2',
    green: 'g * 3'
  };

testModule('dynamic', options, image);