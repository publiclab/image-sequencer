var test = require('tape');
require('../../../src/ImageSequencer.js');

var sequencer1 = ImageSequencer({ ui: false });
var sequencer2 = ImageSequencer({ ui: false });
var red = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z';

test('Load ndvi-colormap meta module', function(t) {
  sequencer1.loadImages(red);
  sequencer1.addSteps('ndvi-colormap');
  sequencer1.run((out) => {
    t.isNotEqual(out, undefined, 'Opaque Meta-Module not undefined');
    t.end();
  });
});

test('Load colorbar opaque meta module', function(t) {
  sequencer2.loadImages(red);
  sequencer2.addSteps('colorbar'); // this has been refactored as an opaque meta-module https://github.com/publiclab/image-sequencer/issues/315
  sequencer2.run((out) => {
    t.isNotEqual(out, undefined, 'Opaque Meta-Module not undefined');
    t.end();
  });
});
