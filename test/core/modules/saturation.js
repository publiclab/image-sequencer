const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAtSURBVKXBAQEAMAiAME6H9y9nDw3B9v7MEkgkkUQSSSSRRBJJJJFEEkkkkUQH2vAC/LDhuwsAAAAASUVORK5CYII=',
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAsSURBVKXBAQEAMAiAME43m7+XhmB7f2YJJJJIIokkkkgiiSSSSCKJJJJIogOYTgJtR8dNuwAAAABJRU5ErkJggg==',
  _options = {
    saturation: 0.5
  },
  options = {
    saturation: 1.2
  };

require('../templates/options-test')('saturation', [options, _options], [benchmark, _benchmark]);

testModule('saturation', options, benchmark);