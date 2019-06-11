const testModule = require('../templates/module-test.1');
image = require('../images/IS-QR'),
options = {
  filter: 'blue'
};

testModule('ndvi', options, image);