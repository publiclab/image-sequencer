'use strict';

var fs = require('fs');
var test = require('tape');

// We should only test headless code here.
// http://stackoverflow.com/questions/21358015/error-jquery-requires-a-window-with-a-document#25622933

require('../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var red = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";

test('loadImages/loadImage has a name generator.', function (t){
  sequencer.loadImage(red);
  t.equal(sequencer.images.image1.steps.length, 1, "Initial Step Created");
  t.end();
});

test('loadImages/loadImage returns a wrapper in the callback.', function (t){
  sequencer.loadImage(red, function() {
    var returnval = this;
    t.equal(returnval.name,"ImageSequencer Wrapper", "Wrapper is returned");
    t.equal(returnval.images[0],"image2","Image scope is defined");
    t.end();
  });
});

test('addSteps is two-way chainable.', function (t){
  sequencer.loadImage(red, function(){
    var returnval = this;
    this.addSteps('invert');
    t.equal(returnval.name,"ImageSequencer Wrapper", "Wrapper is returned");
    t.equal(returnval.images[0],"image3","Image scope is defined");
    t.equal(sequencer.images.image3.steps.length,2,"Loaded image is affected");
    t.equal(sequencer.images.image3.steps[1].options.name,"invert","Correct Step Added");
    t.equal(sequencer.images.image2.steps.length,1,"Other images are not affected");
    t.equal(sequencer.images.image1.steps.length,1,"Other images are not affected");
    t.end();
  });
});

test('addSteps is two-way chainable without loadImages.', function (t){
  var returnval = sequencer.addSteps("image3","ndvi-red");
  t.equal(returnval.name,"ImageSequencer","Sequencer is returned");
  t.equal(sequencer.images.image3.steps.length,3,"Step length increased");
  t.equal(sequencer.images.image3.steps[2].options.name,"ndvi-red","Correct Step Added");
  t.end();
});

test('removeSteps is two-way chainable.', function (t){
  sequencer.loadImage(red,function(){
    var returnval = this;
    this.addSteps('invert').removeSteps(1);
    t.equal(returnval.name,"ImageSequencer Wrapper", "Wrapper is returned");
    t.equal(returnval.images[0],"image4","Image scope is defined");
    t.equal(sequencer.images.image4.steps.length,1);
    t.end();
  });
});

test('removeSteps is two-way chainable without loadImages.', function (t){
  var returnval = sequencer.removeSteps("image3",1);
  t.equal(returnval.name,"ImageSequencer","Sequencer is returned");
  t.equal(sequencer.images.image3.steps.length,2);
  t.end();
});

test('insertSteps is two-way chainable.', function (t){
  sequencer.loadImage(red,function() {
    var returnval = this;
    this.insertSteps(1,'invert');
    t.equal(returnval.name,"ImageSequencer Wrapper","Wrapper is returned");
    t.equal(returnval.images[0],"image5","Image scope is defined");
    t.equal(sequencer.images.image5.steps.length,2);
    t.equal(sequencer.images.image5.steps[1].options.name,"invert","Correct Step Inserrted");
    t.end();
  });
});

test('insertSteps is two-way chainable without loadImages.', function (t){
  var returnval = sequencer.insertSteps("image5",1,"ndvi-red");
  t.equal(returnval.name,"ImageSequencer","Sequencer is returned");
  t.equal(sequencer.images.image5.steps.length,3);
  t.equal(sequencer.images.image5.steps[1].options.name,"ndvi-red","Correct Step Inserrted");
  t.end();
});
