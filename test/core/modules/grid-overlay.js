const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAMAzDIF7/nncRgYcTTDTRRBNNNNFEE0000UQTTTTRRB9NQAEfe+dsMAAAAABJRU5ErkJggg==',
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAMAzDIF7/nncRgYcTTDTRRBNNNNFEE0000UQTTTTRRB9NQAEfe+dsMAAAAABJRU5ErkJggg==',
  option = {x: 1},
  _options = {x: 1, y: 1};

require('../templates/options-test')('grid-overlay', [option, _options], [benchmark, _benchmark]);

testModule('grid-overlay', {x: 1}, benchmark);