const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAtSURBVKXBAQEAMAiAME6H9y9nDw3B9v7MEkgkkUQSSSSRRBJJJJFEEkkkkUQH2vAC/LDhuwsAAAAASUVORK5CYII=',
  options = {
    saturation: 1.2
  };

testModule('saturation', options, benchmark);