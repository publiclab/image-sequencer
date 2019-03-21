var test = require('tape');
var base64Img = require('base64-img');
var looksSame = require('looks-same');
require('../../../src/ImageSequencer.js');

var sequencer1 = ImageSequencer({ ui: false });
var options = {size:200,qrCodeString:'https://github.com/publiclab/image-sequencer'};
var target = 'test_outputs';
var red = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==";
var benchmark= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5+qDMPsIJJJIIokkkkgiiSSSSCKJJJJIogNrygQcXEYsHQAAAABJRU5ErkJggg==';
// Test 1 to check brightness module is getting loaded
test('Load add QR module', function(t) {
    sequencer1.loadImages(red);
    sequencer1.addSteps('add-qr', options);
    t.equal(sequencer1.steps[1].options.name, "add-qr", "Add-QR module is getting loaded.");
    t.end();
});

// Test 2 to check options are correct
test('Check Options', function(t) {
    sequencer1.loadImages(red);
    sequencer1.addSteps('add-qr', options);
    t.equal(sequencer1.steps[1].options.size, 200, "Options are correct");
    t.end();
});


// Test 3 to check Add QR module works as expected
test('Add QR module works correctly', function(t) {
    sequencer1.run( function(out) {
      var result = sequencer1.steps[1].output.src
      base64Img.imgSync(result, target, 'result')
      base64Img.imgSync(benchmark, target, 'benchmark')
      result = 'test_outputs/result.png'
      benchmark = 'test_outputs/benchmark.png'
      looksSame(result, benchmark, function(err, res) {
        if (err) console.log(err)
        t.equal(res.equal, true)
        t.end()
      })
    })
})


