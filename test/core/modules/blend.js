var test = require('tape')
var base64Img = require('base64-img')
var looksSame = require('looks-same')

require('../../../src/ImageSequencer')

var sequencer = ImageSequencer({ui: false})
var red = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg=="
// this will need updating for the blend module:
var benchmark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAACSSURBVKXBMUoDURAA0Dc/w4ZgJdh5AE/urawsBMuIpDBkx4VNESzWH/57gTKgGZSuXvGAPQJh2wkfyHd8onDAhIaw7Yxn5CP2mJFIBMK2whPygAkXq7AK/5uQgR0aCqFfQ1oEAuU+gXQj3KfQDEp/lH6FdFUolD4XfCEtfnDGjNLnhDekxRHfmFH6vFjlzphm0C96GR7JNsLICQAAAABJRU5ErkJggg=="
var target = 'test_outputs'

var options = {
  blend: function(r1, g1, b1, a1, r2, g2, b2, a2) {
    // I don't expect this to work now but we should make it possible!
    // it should make a diagonal cut mask between images A and B
    if (x + y > image.width) {
      return [ r1, g1, b1, 1];
    } else {
      return [r2, g2, b2, 1];
    }
}

test('Blend module loads correctly', function(t) {
  sequencer.loadImages('test', red)
  sequencer.addSteps('import-image')
  sequencer.addSteps('blend')
  t.equal(sequencer.images.test.steps[1].options.name, 'blend', 'Blend module is getting loaded')
  t.end()
})

test('Blend module loads with correct options', function(t) {
    t.equal(sequencer.images.test.steps[1].options.offset, -2, 'Options are correct');
    t.end();
})

test('Blend module works correctly', function(t) {
  sequencer.run({mode:'test'}, function(out) {
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
