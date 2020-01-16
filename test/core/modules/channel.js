const benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5mqEMAtHIJFEEkkkkUQSSSSRRBJJJJFEEj1UXgIdx5M8pQAAAABJRU5ErkJggg==',
  testModule = require('../templates/module-test'),
  optionsTest = require('../templates/options-test'),
  benchmark1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAMAzDIF7/nncRgYcTTDTRRBNNNNFEE0000UQTTTTRRB9NQAEfe+dsMAAAAABJRU5ErkJggg==',
  benchmark2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5mqEMAtHIJFEEkkkkUQSSSSRRBJJJJFEEj1UXgIdx5M8pQAAAABJRU5ErkJggg==';

testModule('channel', {channel: 'red'}, benchmark);

optionsTest('channel', [{channel: 'green'}, {channel: 'red'}], [benchmark1, benchmark2]);