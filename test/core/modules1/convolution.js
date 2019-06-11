const testModule = require('../templates/module-test.1'),
 
  image = require('../images/IS-QR'),
  options = {
    constantFactor: 0.4,
    kernelValues: '1 0 1 0 1 0 1 0 1'
  };

testModule('convolution', options, image);