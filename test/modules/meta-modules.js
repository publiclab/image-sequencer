var test = require('tape');
require('../../src/ImageSequencer.js');

var sequencer1 = ImageSequencer({ ui: false });
var sequencer2 = ImageSequencer({ ui: false });
var red = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";

test('Load ndvi-colormap meta module', function(t) {
    sequencer1.loadImages('image1', red);
    sequencer2.loadImages('image1', red);
    sequencer1.addSteps('ndvi-colormap');
    sequencer2.addSteps(['ndvi', 'colormap']);
    t.equal(sequencer1.images.image1.steps[0].options.name, sequencer2.steps[0].options.name, "First step OK");
    t.equal(sequencer1.images.image1.steps[1].options.name, sequencer2.steps[1].options.name, "Second step OK");
    t.end();
});