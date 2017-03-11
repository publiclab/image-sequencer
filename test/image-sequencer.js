'use strict';

var fs = require('fs');
var test = require('tape');

// We should only test headless code here. 
// http://stackoverflow.com/questions/21358015/error-jquery-requires-a-window-with-a-document#25622933 

require('../src/ImageSequencer.js');

//function read (file) {
//  return fs.readFileSync('./test/fixtures/' + file, 'utf8').trim();
//}

//function write (file, data) { /* jshint ignore:line */
//  return fs.writeFileSync('./test/fixtures/' + file, data + '\n', 'utf8');
//}

// read('something.html')

test('addStep adds a step', function (t) {
  var sequencer = ImageSequencer({ ui: false });
  t.equal(sequencer.steps.length, 0);
  sequencer.addStep('ndvi-red');
  sequencer.addStep('green-channel');
  sequencer.addStep('image-threshold');
  t.equal(sequencer.steps.length, 3);
  t.end();
});

test('each core module has a draw() method which outputs an image via options.output()', function (t) {
  t.plan(12);
  var sequencer = ImageSequencer({ ui: false });
  t.equal(sequencer.steps.length, 0);
  Object.keys(sequencer.modules).forEach(function(moduleName, i) {
    // some modules don't work headlessly; we should make stating this a module API requirement
    if (moduleName !== "image-select" && moduleName !== "plot") sequencer.addStep(moduleName);
  });
  // should already have image-select:
  t.equal(sequencer.steps.length, Object.keys(sequencer.modules).length - 2);
  var images = [];
  var Image = require("canvas").Image; 
  var image = new Image();
  // dancing cactus test image:
  image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAxQTFRFAAAABQkEaqiYV8E6eKx7SQAAAAF0Uk5TAEDm2GYAAAABYktHRAH/Ai3eAAAACXBIWXMAAABIAAAASABGyWs+AAAAXUlEQVQY04XOoQ7AMAgEUEzNTH/tDAbTr8PU7Otmahhk2VY6sQviicsFIma6cqPQhgzUvkJEf9GkMxJsqK8mGCBYIB+YacbhN6HUgD83w1pCtPcxgz3SlV/4UhgPToo5Yg32KuZBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTMwVDE3OjExOjM4LTA1OjAwCQ+zKAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0zMFQxNzoxMToyNS0wNTowMNUvasoAAAAASUVORK5CYII=";
  sequencer.steps.forEach(function(step, i) {
    t.equal(step.draw === 'undefined', false);
    step.options.output = function moduleOutput(img) { images.push(image); }
    t.equal(step.draw(image));
  });
  t.equal(images.length, sequencer.steps.length);
  // and be sure they're all real images
  images.forEach(function forEachImage(img) {
    t.equal('Image', typeof img);
    t.ok(img.src);
  });
console.log("GOT HERE")
  t.end();
});

//test('a blank module does not modify an image, according to diff', function (t) {
  
//});

//test('a module modifies an image', function (t) {
  
//});
