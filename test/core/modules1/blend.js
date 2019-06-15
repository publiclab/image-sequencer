const test = require('tape'),
  ImageSequencer = require('../../../src/ImageSequencer'),
  image = require('../images/IS-QR'),
  options = {
    offset: -1
  };

let sequencer = ImageSequencer({ui: false});
sequencer.loadImages(image);
sequencer.addSteps('brightness', {});
sequencer.addSteps('blend', options);

test('blend module', t => {
  var startTime = new Date().getMilliseconds();
  sequencer.run({mode: 'test'}, () => {
    var endTime = new Date().getMilliseconds();
    console.log(`blend module ran in ${(endTime - startTime)} milliseconds`);
    sequencer = null;
    t.end();
  });
});