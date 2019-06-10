const testModule = require('../templates/module-test'),
  options = {size:200, qrCodeString:'https://github.com/publiclab/image-sequencer'},
  benchmark= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5+qDMPsIJJJIIokkkkgiiSSSSCKJJJJIogNrygQcXEYsHQAAAABJRU5ErkJggg==';

testModule('add-qr', options, benchmark);