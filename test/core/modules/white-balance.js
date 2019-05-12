const testModule = require('../templates/module-test'),
  options = {red: 240, green: 240, blue: 240},
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7QYjkEgiiSSSSCKJJJJIIokkkkgiiR5YbQIegx78CAAAAABJRU5ErkJggg==';

testModule('white-balance', options, benchmark);