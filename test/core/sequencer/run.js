'use strict';

var fs = require('fs');
var test = require('tape');
var DataURItoBuffer = require('data-uri-to-buffer');

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var red = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z';

sequencer.loadImages(red);
sequencer.addSteps('invert');
sequencer.addSteps('invert');
sequencer.addSteps('invert');

test('run() works with all possible argument combinations', function(t){
  sequencer.run(function (out) {
    var output1 = DataURItoBuffer(sequencer.steps.slice(-1)[0].output.src);
    sequencer.steps.splice(1, 1);
    sequencer.run({index: 1}, function(out){
      var output2 = DataURItoBuffer(sequencer.steps.slice(-1)[0].output.src);
      t.deepEqual(output1, output2, 'output remains same after removing a step and running sequencer from a greater index');
      sequencer.run(function(out){
        t.end();
      });
    });
  });
});