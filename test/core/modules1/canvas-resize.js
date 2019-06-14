var test = require('tape');

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var options = { width: 500, height: 500 };
var red = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';
sequencer.loadImages(red);
sequencer.addSteps('canvas-resize', options);


test('canvas-resize ', function(t) {
  var startTime = new Date().getMilliseconds();
  sequencer.run({ mode: 'test' }, function(out) {
    var endTime = new Date().getMilliseconds();
    console.log(`canvas-resize module ran in ${(endTime - startTime)} milliseconds`);
    sequencer = null;
    t.end();
  });
});