// const test = require('tape'),
//   base64Img = require('base64-img'),
//   looksSame = require('looks-same');

// require('../../../src/ImageSequencer');

// const sequencer = ImageSequencer({ui: false}),
//   target = 'test_outputs';

// test('Average module loads correctly', function(t) {
//   sequencer.loadImages(red)
//   sequencer.addSteps('average', options)
//   t.equal(sequencer.steps[1].options.name, 'average', 'Average module is getting loaded')
//   t.end()
// })

// test('Blur module loads with correct options', function(t) {
//     t.equal(sequencer.steps[1].options.blur, 3.25, 'Options are correct');
//     t.end();
// })

// test('Blur module works correctly', function(t) {
//   sequencer.run({mode:'test'}, function(out) {
//     var result = sequencer.steps[1].output.src
//     base64Img.imgSync(result, target, 'result')
//     base64Img.imgSync(benchmark, target, 'benchmark')
//     result = './test_outputs/result.png'
//     benchmark = './test_outputs/benchmark.png'
//     looksSame(result, benchmark, function(err, res) {
//       if (err) console.log(err)
//       t.equal(res.equal, true)
//       t.end()
//     })
//   })
// })
