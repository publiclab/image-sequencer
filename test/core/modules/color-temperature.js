const testModule = require('../templates/module-test'),
  options = {
    temperature: 20000
  },
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPN242uEMAtHIJFEEkkkkUQSSSSRRBJJJJFEEj1AkwGaEGLV7wAAAABJRU5ErkJggg==';

testModule('color-temperature', options, benchmark);