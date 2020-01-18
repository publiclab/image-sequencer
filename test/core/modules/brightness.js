const benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQfjAgULAir0wiRrAAAADUlEQVQY02NgGAXIAAABEAAB7JfjegAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMi0wNVQxMTowMjo0MiswMjowMCdP+X4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDItMDVUMTE6MDI6NDIrMDI6MDBWEkHCAAAAAElFTkSuQmCC',
  benchmark1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7QYjkEgiiSSSSCKJJJJIIokkkkgiiR5YbQIegx78CAAAAABJRU5ErkJggg==',
  benchmark2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAqSURBVKXBAQEAAAiAIHNf/+/UCGEWjkAiiSSSSCKJJJJIIokkkkgiiSR6gcMBa2MNA5YAAAAASUVORK5CYII=',
  testModule = require('../templates/module-test'),
  optionsTest = require('../templates/options-test');

testModule('brightness', {brightness: 1}, benchmark);

optionsTest('brightness', [{brightness: 175}, {brightness: 30}], [benchmark1, benchmark2]);