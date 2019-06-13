var test = require('tape');

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({
  ui: false,
  useWasm:true
});

var Qr = require('../images/IS-QR');
sequencer.loadImages(Qr);
sequencer.addSteps('decode-qr');


test('Decode-qr ', function (t) {
  var startTime = new Date().getMilliseconds();
  sequencer.run({
    mode: 'test'
  }, function (out) {
    var endTime = new Date().getMilliseconds();
    console.log(`decode-qr module ran in ${(endTime - startTime)} milliseconds`);    
    sequencer = null;
    t.end();
  });
});