var test = require('tape')
var looksSame = require('looks-same')
var base64Img = require('base64-img')

require('../../../src/ImageSequencer')

var sequencer = ImageSequencer({ui: false})
var red = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg=="
var benchmark = ""
var target = 'test_outputs'

test('Load Gradient module', function(t) {
  sequencer.loadImages('test', red)
  sequencer.addSteps('test', 'gradient')
  t.equal(sequencer.images.test.steps.length, 2, 'steps loaded correctly')
  t.equal(sequencer.images.test.steps[1].options.name, 'gradient', 'module loaded correctly')
  t.end()
})