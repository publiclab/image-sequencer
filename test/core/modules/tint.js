const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAqSURBVKXBAQ0AAAiAMCSy/TcNwT+wRyCRRBJJJJFEEkkkkUQSSSSRRBI9GygBkdItUBEAAAAASUVORK5CYII=',
  options = {
    color: '30, 40, 190',
    factor: 0.6
  };

testModule('tint', options, benchmark);