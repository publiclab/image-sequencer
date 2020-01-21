const benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7QYjkEgiiSSSSCKJJJJIIokkkkgiiR5YbQIegx78CAAAAABJRU5ErkJggg==',
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7QYjkEgiiSSSSCKJJJJIIokkkkgiiR5YbQIegx78CAAAAABJRU5ErkJggg==',
  testModule = require('../templates/module-test'),
  optionsChange = require('../templates/options-test'),
  option = {contrast: 40},
  _option = {contrast: 84};

testModule('contrast', option, benchmark);

optionsChange('contrast', [option, _option], [benchmark, _benchmark]);