var test = require('tape')
var base64Img = require('base64-img')
var looksSame = require('looks-same')

require('../../../src/ImageSequencer')

var sequencer = ImageSequencer({ui: false})
var red = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg=="
var benchmark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAB/SURBVKXBAQHAIAAEoXP9OzM/g9BlKlOZylSmMpWpzKn04OtCgwYNGjRo0KBT6cHXhQYNGjRo0KBBp9KDrwsNGjRo0KBBg06lB18XGjRo0KBBgwadSg++LjRo0KBBgwYNOpUefF1o0KBBgwYNGnQqPfi60KBBgwYNGjToVHrwA6E21z8iJpDFAAAAAElFTkSuQmCC"

var target = 'test_outputs'

var options = {dither: 'bayer'}

test('Dither module loads correctly', function(t) {
  sequencer.loadImages(red)
  sequencer.addSteps('dither', options)
  t.equal(sequencer.steps[1].options.name, 'dither', 'Dither module is getting loaded')
  t.end()
})

test('Dither module loads with correct options', function(t) {
    t.equal(sequencer.steps[1].options.dither, 'bayer', 'Options are correct');
    t.end();
})

test('Dither module works correctly', function(t) {
  sequencer.run({mode:'test'}, function(out) {
    var result = sequencer.steps[1].output.src
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

