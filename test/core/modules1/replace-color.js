const testModule = require('../templates/module-test.1'),
  options = {
    'replaceMethod': 'greyscale',
    'color': '255 0 0',
    'tolerance': '50'
  };
testModule('replace-color', options);