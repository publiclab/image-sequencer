var test = require('tape');

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });

var Qr = require('../images/IS-QR');

test('Load Decode-Qr module', function(t) {
  sequencer.loadImages(Qr);
  sequencer.addSteps('decode-qr');
  t.equal(sequencer.steps[1].options.name, 'decode-qr', 'Decode-Qr module is getting loaded');
  t.end();
});

test('Decode-qr module works correctly', function(t) {
  sequencer.run({ mode: 'test' }, function(out) {
    var result = sequencer.steps[1].options.step.qrval;
    t.equal(result, 'http://github.com/publiclab/image-sequencer', 'should be equal');
    t.end();
  });
});