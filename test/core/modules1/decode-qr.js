var test = require('tape');

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({
  ui: false
});

var Qr = require('../images/IS-QR');
sequencer.loadImages(Qr);
sequencer.addSteps('decode-qr');


test('Decode-qr ', function (t) {
  var startTime = Date.now();
  sequencer.run({
    mode: 'test'
  }, function (out) {
    var endTime = Date.now();
    console.log(`decode-qr module ran in ${(endTime - startTime)} milliseconds`);
    sequencer = null;
    t.end();
  });
});