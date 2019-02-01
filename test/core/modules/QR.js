var test = require('tape');
require('../../../src/ImageSequencer.js');

var sequencer1 = ImageSequencer({ ui: false });
var options = {size:200,qrCodeString:'https://github.com/publiclab/image-sequencer'};
var red = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";

// Test 1 to check brightness module is getting loaded
test('Load add QR module', function(t) {
    sequencer1.loadImages('image1', red);
    sequencer1.addSteps('add-qr', options);
    t.equal(sequencer1.images.image1.steps[1].options.name, "add-qr", "Add-QR module is getting loaded.");
    t.end();
});

// Test 2 to check options are correct
test('Check Options', function(t) {
    sequencer1.loadImages('image1', red);
    sequencer1.addSteps('add-qr', options);
    t.equal(sequencer1.images.image1.steps[1].options.size, 200, "Options are correct");
    t.end();
});