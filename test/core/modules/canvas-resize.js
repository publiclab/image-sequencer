var test = require('tape');

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var options = { width: 500, height: 500 };
var red = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';

// Test 1 to check brightness module is getting loaded
test('Load canvas-resize module', function(t) {
  sequencer.loadImages(red);
  sequencer.addSteps('canvas-resize', options);
  t.equal(sequencer.steps[1].options.name, 'canvas-resize', 'Canvas resize module is getting loaded');
  t.end();
});

// Test 2 to check options are correct
test('Check Options', function(t) {
  t.equal(sequencer.steps[1].options.width, 500, 'Options are correct');
  t.equal(sequencer.steps[1].options.height, 500, 'Options are correct');
  t.end();
});

// Test 3 to check brightness module works as expected
test('canvas-resize module works correctly', function(t) {
  sequencer.run(function(out) {
    var result = sequencer.steps[1].output.src;
    require('get-pixels')(result, (err, pix) => {
      t.equal(pix.shape[0], 500);
      t.equal(pix.shape[1], 500);
      t.end();
    });
  });
});