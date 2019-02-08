var test = require('tape');
require('../../src/ImageSequencer.js');

var sequencer1 = ImageSequencer({ ui: false });
var options = {brightness : 50};
var red = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";

// Test 1 to check brightness module is getting loaded
test('Load brightness module', function(t) {
    sequencer1.loadImages('image1', red);
    sequencer1.addSteps('brightness', options);
    t.equal(sequencer1.images.image1.steps[1].options.name, "brightness", "Brightness module is getting loaded.");
    t.end();
});

// Test 2 to check options are correct
test('Check Options', function(t) {
    sequencer1.loadImages('image1', red);
    sequencer1.addSteps('brightness', options);
    t.equal(sequencer1.images.image1.steps[1].options.brightness, 50, "Options are correct");
    t.end();
});