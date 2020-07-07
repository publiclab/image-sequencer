const testModule = require('../templates/module-test'),
  options = {
    temperature: 20000
  },
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPN242uEMAtHIJFEEkkkkUQSSSSRRBJJJJFEEj1AkwGaEGLV7wAAAABJRU5ErkJggg==',
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5mqEMAtHIJFEEkkkkUQSSSSRRBJJJJFEEj1UXgIdx5M8pQAAAABJRU5ErkJggg==',
  optionsTest = require('../templates/options-test');

testModule('color-temperature', options, benchmark);

optionsTest('color-temperature', [options, {temperature: 60}], [benchmark, _benchmark]);