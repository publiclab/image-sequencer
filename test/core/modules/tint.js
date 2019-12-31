const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAtSURBVKXBMQEAIAzAsK4q0MmDfCaiybxzP4FEEkkkkUQSSSSRRBJJJJFEEkm0X48CIHSzMhMAAAAASUVORK5CYII=',
  options = {
    color: 'rgb(30,40,190)',
    factor: 0.6
  };

testModule('tint', options, benchmark);