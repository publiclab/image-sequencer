var test = require('tape');
require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var red = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z';

test('Dynamically add a test Module', function(t) {
  sequencer.loadNewModule('test', { func: require('../testModule/Module'), info: require('../testModule/info') });
  sequencer.loadImages(red);
  t.deepEqual(sequencer.modules['test'], [
    require('../testModule/Module'),
    require('../testModule/info')
  ], 'test module was succesfully imported');
  sequencer.addSteps('invert');
  sequencer.addSteps('test');
  sequencer.addSteps('invert');
  sequencer.run();
  t.end();
});