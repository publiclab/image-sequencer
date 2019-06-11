const testModule = require('../templates/module-test.1'),
  image = require('../images/IS-QR'),
 
  options = {
    Axis: 'horizontal' 
  };

testModule('flip-image', options, image);