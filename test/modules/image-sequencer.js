'use strict';

var fs = require('fs');
var test = require('tape');

// We should only test headless code here.
// http://stackoverflow.com/questions/21358015/error-jquery-requires-a-window-with-a-document#25622933

require('../src/ImageSequencer.js');

// This function is used to test whether or not any additional global variables are being created
function copy(g,a) {
  var b = {};
  var i = 0;
  for (var v in a)
    if(g) {
      if(v != "sequencer") b[v] = a[v];
    }
    else {
      if(v != "sequencer" && v!="global1" && v!="global2" && !global1.hasOwnProperty(v)) i++;
    }
  if(g) return b;
  else return i;
}
var parent = (typeof(global)==="undefined")?window:global;
var global1 = copy(true,parent);

var sequencer = ImageSequencer({ ui: false });
var red = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";

test('Image Sequencer has tests', function (t) {
  t.equal(true, true, "Initial Test");
  t.end();
});

test('loadImages loads a DataURL image and creates a step.', function (t){
  sequencer.loadImages('test',red);
  t.equal(sequencer.images.test.steps.length, 1, "Initial Step Created");
  t.equal(typeof(sequencer.images.test.steps[0].output.src), "string", "Initial output exists");
  t.end();
});

test('modulesInfo() returns info for each module', function (t){
  var info = sequencer.modulesInfo();
  t.equal(Object.keys(info).length, 8);
  t.equal(Object.keys(info).length, Object.keys(sequencer.modules).length);
  t.equal(info.hasOwnProperty(Object.keys(sequencer.modules)[0]), true);
  t.equal(info[Object.keys(sequencer.modules)[0]].hasOwnProperty('name'), true);
  t.equal(info[Object.keys(sequencer.modules)[0]].hasOwnProperty('inputs'), true);
  t.end();
});

if(!sequencer.options.inBrowser)
  test('loadImage loads an image from URL and creates a step. (NodeJS)', function (t){
    require('dns').resolve('www.github.com', function(err) {
      if (err) {
        console.log("Test aborted due to no internet");
        t.end();
      }
      else {
        sequencer.loadImage('URL','https://ccpandhare.github.io/image-sequencer/examples/images/red.jpg', function(){
          t.equal(sequencer.images.URL.steps.length, 1, "Initial Step Created");
          t.equal(typeof(sequencer.images.URL.steps[0].output.src), "string", "Initial output exists");
          t.end();
        });
      }
    });
  });

if(!sequencer.options.inBrowser)
  test('loadImages loads an image from PATH and creates a step. (NodeJS)', function (t){
    sequencer.loadImages('examples/images/red.jpg');
    t.equal(sequencer.images.image1.steps.length, 1, "Initial Step Created");
    t.equal(typeof(sequencer.images.image1.steps[0].output.src), "string", "Initial output exists");
    t.end();
  });

test('loadImage works too.', function (t){
  sequencer.loadImage('test2',red);
  t.equal(sequencer.images.test2.steps.length, 1, "Initial Step Created");
  t.equal(typeof(sequencer.images.test2.steps[0].output.src), "string", "Initial output exists");
  t.end();
});

test('addSteps("image","name") adds a step', function (t) {
  sequencer.addSteps('test','green-channel');
  t.equal(sequencer.images.test.steps.length, 2, "Length of steps increased")
  t.equal(sequencer.images.test.steps[1].options.name, "green-channel", "Correct Step Added");
  t.end();
});

test('addSteps("name") adds a step', function (t) {
  sequencer.addSteps('green-channel');
  t.equal(sequencer.images.test.steps.length, 3, "Length of steps increased");
  t.equal(sequencer.images.test.steps[2].options.name, "green-channel", "Correct Step Added");
  t.end();
});

test('addSteps(["name"]) adds a step', function (t) {
  sequencer.addSteps(['green-channel','invert']);
  t.equal(sequencer.images.test.steps.length, 5, "Length of steps increased by two")
  t.equal(sequencer.images.test.steps[3].options.name, "green-channel", "Correct Step Added");
  t.equal(sequencer.images.test.steps[4].options.name, "invert", "Correct Step Added");
  t.end();
});

test('addSteps("name",o) adds a step', function (t) {
  sequencer.addSteps('green-channel',{});
  t.equal(sequencer.images.test.steps.length, 6, "Length of steps increased");
  t.equal(sequencer.images.test.steps[5].options.name, "green-channel", "Correct Step Added");
  t.end();
});

test('addSteps("image","name",o) adds a step', function (t) {
  sequencer.addSteps('test','green-channel',{});
  t.equal(sequencer.images.test.steps.length, 7, "Length of steps increased");
  t.equal(sequencer.images.test.steps[6].options.name, "green-channel", "Correct Step Added");
  t.end();
});

test('removeSteps("image",position) removes a step', function (t) {
  sequencer.removeSteps('test',1);
  t.equal(sequencer.images.test.steps.length, 6, "Length of steps reduced");
  t.end();
});

test('removeSteps({image: [positions]}) removes steps', function (t) {
  sequencer.removeSteps('test',[1,2]);
  t.equal(sequencer.images.test.steps.length, 4, "Length of steps reduced");
  t.end();
});

test('removeSteps(position) removes steps', function (t) {
  sequencer.removeSteps([1,2]);
  t.equal(sequencer.images.test.steps.length, 2, "Length of steps reduced");
  t.end();
});

test('insertSteps("image",position,"module",options) inserts a step', function (t) {
  sequencer.insertSteps('test',1,'green-channel',{});
  t.equal(sequencer.images.test.steps.length, 3, "Length of Steps increased");
  t.equal(sequencer.images.test.steps[1].options.name, "green-channel", "Correct Step Inserted");
  t.end();
});

test('insertSteps("image",position,"module") inserts a step', function (t) {
  sequencer.insertSteps('test',1,'green-channel');
  t.equal(sequencer.images.test.steps.length, 4, "Length of Steps increased");
  t.equal(sequencer.images.test.steps[1].options.name, "green-channel", "Correct Step Inserted");
  t.end();
});

test('insertSteps(position,"module") inserts a step', function (t) {
  sequencer.insertSteps(1,'green-channel');
  t.equal(sequencer.images.test.steps.length, 5, "Length of Steps increased");
  t.equal(sequencer.images.test.steps[1].options.name, "green-channel", "Correct Step Inserted");
  t.end();
});

test('insertSteps({image: {index: index, name: "module", o: options} }) inserts a step', function (t) {
  sequencer.insertSteps({test: {index:1, name:'green-channel', o:{} } });
  t.equal(sequencer.images.test.steps.length, 6, "Length of Steps increased");
  t.equal(sequencer.images.test.steps[1].options.name, "green-channel", "Correct Step Inserted");
  t.end();
});

test('run() runs the sequencer and returns output to callback', function (t) {
  sequencer.run('test',function(out){
    t.equal(typeof(sequencer.images.test.steps[sequencer.images.test.steps.length - 1].output), "object", "Output is Generated");
    t.equal(out,sequencer.images.test.steps[sequencer.images.test.steps.length - 1].output.src, "Output callback works");
  });
  t.end();
});

test('replaceImage returns false in NodeJS', function (t) {
  var returnvalue = (sequencer.options.inBrowser)?false:sequencer.replaceImage("#selector","test");
  t.equal(returnvalue,false,"It does.");
  t.end();
});

var global2 = copy(false,parent);
test('No Global Variables Created', function (t) {
  t.equal(0,global2,"None Created.");
  t.end();
});
