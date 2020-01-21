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
