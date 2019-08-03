'use strict';

var fs = require('fs');
var test = require('tape');

// We should only test headless code here.
// http://stackoverflow.com/questions/21358015/error-jquery-requires-a-window-with-a-document#25622933

require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var red = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z';

test('loadImages/loadImage has a name generator.', function (t){
  sequencer.loadImage(red);
  t.equal(sequencer.steps.length, 1, 'Initial Step Created');
  t.end();
});

test('loadImages/loadImage returns a wrapper in the callback.', function (t){
  sequencer.loadImage(red, function() {
    var returnval = this;
    t.equal(returnval.name, 'ImageSequencer Wrapper', 'Wrapper is returned');
    t.end();
  });
});

test('addSteps is two-way chainable.', function (t){
  sequencer.loadImage(red, function(){
    var returnval = this;
    this.addSteps('invert');
    t.equal(returnval.name, 'ImageSequencer Wrapper', 'Wrapper is returned');
    t.equal(sequencer.steps.length, 2, 'Loaded image is affected');
    t.equal(sequencer.steps[1].options.name, 'invert', 'Correct Step Added');
    t.end();
  });
});

test('addSteps is two-way chainable without loadImages.', function (t){
  var returnval = sequencer.addSteps('ndvi');
  t.equal(returnval.name, 'ImageSequencer', 'Sequencer is returned');
  t.equal(sequencer.steps.length, 3, 'Step length increased');
  t.equal(sequencer.steps[2].options.name, 'ndvi', 'Correct Step Added');
  t.end();
});

test('removeSteps is two-way chainable.', function (t){
  sequencer.loadImage(red, function(){
    var returnval = this;
    
    this.addSteps('invert').removeSteps(1);
    t.equal(returnval.name, 'ImageSequencer Wrapper', 'Wrapper is returned');
    t.equal(sequencer.steps.length, 3);
    t.end();
  });
});

test('removeSteps is two-way chainable without loadImages.', function (t){
  var returnval = sequencer.addSteps('blur').removeSteps(3);
  t.equal(returnval.name, 'ImageSequencer', 'Sequencer is returned');
  t.equal(sequencer.steps.length, 3);
  t.end();
});

test('insertSteps is two-way chainable.', function (t){
  sequencer.loadImage(red, function() {
    var returnval = this;
    this.insertSteps(1, 'invert');
    t.equal(returnval.name, 'ImageSequencer Wrapper', 'Wrapper is returned');
    t.equal(sequencer.steps.length, 4);
    t.equal(sequencer.steps[1].options.name, 'invert', 'Correct Step Inserrted');
    t.end();
  });
});

test('insertSteps is two-way chainable without loadImages.', function (t){
  var returnval = sequencer.insertSteps(1, 'ndvi');
  t.equal(returnval.name, 'ImageSequencer', 'Sequencer is returned');
  t.equal(sequencer.steps.length, 5);
  t.equal(sequencer.steps[1].options.name, 'ndvi', 'Correct Step Inserrted');
  t.end();
});
