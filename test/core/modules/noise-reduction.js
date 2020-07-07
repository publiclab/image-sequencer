const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7QYjkEgiiSSSSCKJJJJIIokkkkgiiR5YbQIegx78CAAAAABJRU5ErkJggg==',
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5mqEMAtHIJFEEkkkkUQSSSSRRBJJJJFEEj1UXgIdx5M8pQAAAABJRU5ErkJggg==',
  option = {method: 'Median Filtering'},
  _option = {method: 'Mean Filtering'};

require('../templates/options-test')('noise-reduction', [option, _option], [benchmark, _benchmark]);

testModule('noise-reduction', option, benchmark);
