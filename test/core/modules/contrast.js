var test = require('tape')
var base64Img = require('base64-img')
var looksSame = require('looks-same')

require('../../../src/ImageSequencer')

var sequencer = ImageSequencer({ui: false})
var red = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg=="
var benchmark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2Pc4u39n4ECwDhqAMNoGDCMhgHDsAgDALGCJKF4bsMPAAAAAElFTkSuQmCC"
var target = 'test_outputs'

var options = {contrast: -40}

test('Contrast module loads correctly', function(t) {
  sequencer.loadImages('test', red)
  sequencer.addSteps('test', 'contrast')
  t.equal(sequencer.images.test.steps.length, 2, 'Contrast module loaded')
  t.end()
})

test('Contrast module loads with correct options', function(t) {
  sequencer.addSteps('test', 'contrast', options)
  t.equal(sequencer.images.test.steps[2].options.contrast, -40, 'options loaded correctly')
  t.end()
})

test('Contrast module works correctly', function(t) {
  sequencer.run({mode:'test'}, function(out) {
    var result = sequencer.images.test.steps[2].output.src
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

