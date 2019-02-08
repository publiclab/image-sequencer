var test = require('tape');
var base64Img = require('base64-img');
var looksSame = require('looks-same');

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var options = {brightness : 1};
var target = 'test_outputs';
var red = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==";
var benchmark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQfjAgULAir0wiRrAAAADUlEQVQY02NgGAXIAAABEAAB7JfjegAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMi0wNVQxMTowMjo0MiswMjowMCdP+X4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDItMDVUMTE6MDI6NDIrMDI6MDBWEkHCAAAAAElFTkSuQmCC";

// Test 1 to check brightness module is getting loaded
test('Load brightness module', function(t) {
  sequencer.loadImages('test', red);
  sequencer.addSteps('brightness', options);
  t.equal(sequencer.images.test.steps[1].options.name, 'brightness', 'Brightness module is getting loaded');
  t.end();
});

// Test 2 to check options are correct
test('Check Options', function(t) {
  t.equal(sequencer.images.test.steps[1].options.brightness, 1, 'Options are correct');
  t.end();
});

// Test 3 to check brightness module works as expected
test('Brightness module works correctly', function(t) {
  sequencer.run({ mode: 'test' }, function(out) {
    var result = sequencer.images.test.steps[1].output.src
    base64Img.imgSync(result, target, 'result')
    base64Img.imgSync(benchmark, target, 'benchmark')
    result = './test_outputs/result.png'
    benchmark = './test_outputs/benchmark.png'
    looksSame(result, benchmark, function(err, res) {
      if (err) console.log(err)
      t.equal(res.equal, true)
      t.end()
    })
  })
})