const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7QYjkEgiiSSSSCKJJJJIIokkkkgiiR5YbQIegx78CAAAAABJRU5ErkJggg==';

testModule('noise-reduction', {method: 'Median Filtering'}, benchmark);
