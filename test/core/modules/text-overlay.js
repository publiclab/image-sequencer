var test = require('tape');
var base64Img = require('base64-img');
var looksSame = require('looks-same');

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var options = {text : 'Hello World'};
var target = 'test_outputs'; 
var red = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';

// Test 1 to check text overlay module is getting loaded.
test('Load Text Overlay module', function(t) {
  sequencer.loadImages(red);
  sequencer.addSteps('text-overlay', options);
  t.equal(sequencer.steps[1].options.name, 'text-overlay', 'Text Overlay module is getting loaded');
  t.end();
});

// Test 2 to check options are correct.
test('Check Options', function(t) {
  t.equal(sequencer.steps[1].options.text, 'Hello World', 'Options are correct');
  t.end();
});

// Test 3 to check Text Overlay module works as expected.
test('Text Overlay module works correctly', function(t) {
  sequencer.run({ mode: 'test' }, function(out) {
    // The test runs in node , and the text overlay is a browser only module,
    // thus it there is no image processing and output is same as input.
    var result = sequencer.steps[1].output.src;
    base64Img.imgSync(result, target, 'result');
    base64Img.imgSync(red, target, 'red');
    result = './test_outputs/result.png';
    red = './test_outputs/red.png';
    looksSame(result, red, function(err, res) {
      if (err) console.log(err);
      t.equal(res.equal, true);
      t.end();
    });
  });
});