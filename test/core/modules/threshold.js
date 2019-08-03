const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5+qDMPsIJJJIIokkkkgiiSSSSCKJJJJIogNrygQcXEYsHQAAAABJRU5ErkJggg==';

testModule('threshold', {threshold: 'Automatic Thresholding'}, benchmark);
