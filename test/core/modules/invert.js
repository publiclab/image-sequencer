'use strict';

var test = require('tape');
var looksSame = require('looks-same');
var DataURItoBuffer = require('data-uri-to-buffer');
var base64Img = require('base64-img');

// We should only test headless code here.
// http://stackoverflow.com/questions/21358015/error-jquery-requires-a-window-with-a-document#25622933

require('../../../src/ImageSequencer.js');

//require image files as DataURLs so they can be tested alike on browser and Node.
var sequencer = ImageSequencer({ ui: false });
var target = 'test_outputs';

var red = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';
var invert = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2Nk/P//PwMFgHHUAIbRMGAYDQOGYREGAPACL/GqhhwEAAAAAElFTkSuQmCC';

//Tests for Invert module

test('Load invert module', function(t) {
  sequencer.loadImages( red);
  t.equal(sequencer.steps.length, 1,'Image loaded');
  sequencer.addSteps('invert');
  t.equal(sequencer.steps[1].options.name, 'invert', 'Invert step added');
  t.end();
});

test('Inverted image isn\'t identical', function(t) {
  sequencer.run({ mode: 'test' }, function(out) {
    var input = sequencer.steps[0].output.src;
    var output = sequencer.steps[1].output.src;
    input = DataURItoBuffer(input);
    output = DataURItoBuffer(output);
    t.notEqual(input,output,'Not equal');
    t.end();
  });
});

// test("Twice inverted image is identical to original image", function(t) {
//   sequencer.addSteps('test','invert');
//   sequencer.run({ mode: 'test' }, function(out) {
//     var input = sequencer.steps[0].output.src
//     var output = sequencer.steps[2].output.src
//     base64Img.imgSync(input, target, 'input')
//     base64Img.imgSync(output, target, 'output')
//     input = './test_outputs/input.png'
//     output = './test_outputs/output.png'
//     looksSame(input, output, function(err, res) {
//       if (err) console.log(err)
//       t.equal(res.equal, true)
//       t.end();
//     });
//   })
// });

test('Invert module produces correct output', function(t) {
  sequencer.run({ mode: 'test' }, function(out) {
    var result = sequencer.steps[1].output.src;
    var benchmark = invert;
    base64Img.imgSync(result, target, 'result');
    base64Img.imgSync(benchmark, target, 'benchmark');
    result = './test_outputs/result.png';
    benchmark = './test_outputs/benchmark.png';
    looksSame(result, benchmark, function(err, res) {
      if (err) console.log(err);
      t.equal(res.equal, true);
      t.end();
    });
  });
});