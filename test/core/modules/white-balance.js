const test = require('tape')
const base64Img = require('base64-img')
const looksSame = require('looks-same')

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ui: false})
var options = {red: 240, green: 240, blue: 240}
var target = 'test_outputs'
var image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg=='
var benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7QYjkEgiiSSSSCKJJJJIIokkkkgiiR5YbQIegx78CAAAAABJRU5ErkJggg=='

// Test for loading module
test('Load white balance module', function(t){
  sequencer.loadImages(image)
  sequencer.addSteps('white-balance', options)
  t.equal(sequencer.steps[1].options.name, 'white-balance', 'White Balance module loads correctly')
  t.end()
})

// Test for checking options
test('Options are correct', function(t){
  t.equal(sequencer.steps[1].options.red, 240, 'Red component is correct')
  t.equal(sequencer.steps[1].options.green, 240, 'Green component is correct')
  t.equal(sequencer.steps[1].options.blue, 240, 'Blue component is correct')
  t.end()
})

// Test for correct output
test('White Balance module works correctly', function(t){
  sequencer.run({ mode: 'test' }, function(out) {
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