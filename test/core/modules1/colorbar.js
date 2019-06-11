const testModule = require('../templates/module-test.1'),
  image = require('../images/IS-QR'),
  options = {
    colormap: 'greyscale',
    x: '20',
    y: '30',
    h: '50'
  };

testModule('colorbar', options, image);