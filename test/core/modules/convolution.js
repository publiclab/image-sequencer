const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7QYjkEgiiSSSSCKJJJJIIokkkkgiiR5YbQIegx78CAAAAABJRU5ErkJggg==',
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAqSURBVKXBAQEAAAiAIPP/gN7WCGEWjkAiiSSSSCKJJJJIIokkkkgiiSR6tkYBtxzHTB8AAAAASUVORK5CYII=',
  options = {
    constantFactor: 0.4,
    kernelValues: '1 0 1 0 1 0 1 0 1'
  },
  _options = {
    constantFactor: 0.2,
    kernelValues: '0 0 1 0 1 0 1 0 0'
  },
  optionChange = require('../templates/options-test');

testModule('convolution', options, benchmark);

optionChange('convolution', [options, _options], [benchmark, _benchmark]);