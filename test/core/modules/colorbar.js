const testModule = require('../templates/module-test'),
  options = {
    colormap: 'greyscale',
    x: '1',
    y: '0',
    h: '10'
  },
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAABGSURBVKXBwRHAMAzDMEbXv7n/sHE7QwWcCxtgZlBRUVFRUVFRUVFRUVEJpVAKpVAKpVAKpVB6+Owuf50LSyGUQimUQimUXt8pCbepYPZJAAAAAElFTkSuQmCC',
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAB4SURBVKXBsRUBQRiF0e9/MyzRciTiFe0RSGQSRWwnIg0oTQFaEFCAs5kZUpHg3RsF6i7OjDSMzHjmFZNuQbttSX1D7BN1/eA9PzFMXxwS9ClY3iFfC8IkTMIkTMIkTMIkTJmvW7nw38CPDXCEKFAxCJMwCZMwCdMHfmEToj5jMB0AAAAASUVORK5CYII=',
  optionsTest = require('../templates/options-test');

testModule('colorbar', options, benchmark);

optionsTest('colorbar', [options, {colormap: 'default', x: '1', y: '0', h: '10'}], [benchmark, _benchmark]);