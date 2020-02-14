const testModule = require('../templates/module-test'),
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAMAzDIF7/nncRgYcTTDTRRBNNNNFEE0000UQTTTTRRB9NQAEfe+dsMAAAAABJRU5ErkJggg==',
  option = {threshold: 'Automatic Thresholding'},
  _option = {threshold: 'Manual Thresholding'},
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5+qDMPsIJJJIIokkkkgiiSSSSCKJJJJIogNrygQcXEYsHQAAAABJRU5ErkJggg==';

testModule('threshold', option, benchmark);
  
require('../templates/options-test')('threshold', [option, _option], [benchmark, _benchmark]);