var test = require('tape');
require('../../../src/ImageSequencer.js');

var sequencer1 = ImageSequencer({ ui: false });
var options = {brightness : 0};
var black = ""
var red = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";

sequencer1.loadImages('image1', red);
sequencer1.addSteps('brightness', options);

test("Preload", function(t) {
  sequencer1.run({ mode: 'test' }, function() {
    t.end();
  });
});

// Test 1 to check brightness module is getting loaded
test('Load brightness module', function(t) {
    t.equal(sequencer1.images.image1.steps[1].options.name, "brightness", "Brightness module is getting loaded.");
    t.end();
});

// Test 2 to check options are correct
test('Check Options', function(t) {
    t.equal(sequencer1.images.image1.steps[1].options.brightness, 0, "Options are correct");
    t.end();
});

// Test 3 to check module works correctly
test('Check brightness module', function(t) {
    var test = sequencer1.images.image1.steps[0].output.src;
    var benchmark = black
    test = DataURItoBuffer(test)
    benchmark = DataURItoBuffer(benchmark)
    looksSame(test, benchmark, (err, res)=> {
      if err console.log(err)
      t.equal(res,true)
      t.end()
    })
})