
'use strict';

var fs = require('fs');
var test = require('tape');

// We should only test headless code here.
// http://stackoverflow.com/questions/21358015/error-jquery-requires-a-window-with-a-document#25622933

require('../../../src/ImageSequencer.js');

// This function is used to test whether or not any additional global variables are being created
function copy(g, a) {
  var b = {};
  var i = 0;
  for (var v in a)
    if (g) {
      if (v != 'sequencer') b[v] = a[v];
    }
    else {
      if (v != 'sequencer' && v != 'global1' && v != 'global2' && !global1.hasOwnProperty(v)) i++;
    }
  if (g) return b;
  else return i;
}
var parent = (typeof (global) === 'undefined') ? window : global;
var global1 = copy(true, parent);

var sequencer = ImageSequencer({ ui: false });
var red = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z';

test('Image Sequencer has tests', function(t) {
  t.equal(true, true, 'Initial Test');
  t.end();
});

test('loadImages loads a DataURL image and creates a step.', function(t) {
  sequencer.loadImages(red);
  t.equal(sequencer.steps.length, 1, 'Initial Step Created');
  t.equal(typeof (sequencer.steps[0].output.src), 'string', 'Initial output exists');
  t.end();
});

test('modulesInfo() returns info for each module', function(t) {
  var info = sequencer.modulesInfo();
  t.equal(Object.keys(info).length, Object.keys(sequencer.modules).length);
  t.equal(info.hasOwnProperty(Object.keys(sequencer.modules)[0]), true);
  t.equal(info[Object.keys(sequencer.modules)[0]].hasOwnProperty('name'), true);
  t.equal(info[Object.keys(sequencer.modules)[0]].hasOwnProperty('inputs'), true);
  t.end();
});

if (!sequencer.options.inBrowser)
  test('loadImage loads an image from URL and creates a step. (NodeJS)', function(t) {
    require('dns').resolve('www.github.com', function(err) {
      if (err) {
        console.log('Test aborted due to no internet');
        t.end();
      }
      else {
        sequencer.loadImage('URL', 'https://ccpandhare.github.io/image-sequencer/examples/images/red.jpg', function() {
          t.equal(sequencer.steps.length, 1, 'Initial Step Created');
          t.equal(typeof (sequencer.steps[0].output.src), 'string', 'Initial output exists');
          t.end();
        });
      }
    });
  });

if (!sequencer.options.inBrowser)
  test('loadImages loads an image from PATH and creates a step. (NodeJS)', function(t) {
    sequencer.loadImages('examples/images/red.jpg');
    t.equal(sequencer.steps.length, 1, 'Initial Step Created');
    t.equal(typeof (sequencer.steps[0].output.src), 'string', 'Initial output exists');
    t.end();
  });

test('loadImage works too.', function(t) {
  sequencer.loadImage(red);
  t.equal(sequencer.steps.length, 1, 'Initial Step Created');
  t.equal(typeof (sequencer.steps[0].output.src), 'string', 'Initial output exists');
  t.end();
});

test('addSteps("name") adds a step', function(t) {
  sequencer.addSteps('channel');
  t.equal(sequencer.steps.length, 2, 'Length of steps increased');
  t.equal(sequencer.steps[1].options.name, 'channel', 'Correct Step Added');
  t.end();
});

test('addSteps(["name"]) adds a step', function(t) {
  sequencer.addSteps(['channel', 'invert']);
  t.equal(sequencer.steps.length, 4, 'Length of steps increased by two');
  t.equal(sequencer.steps[2].options.name, 'channel', 'Correct Step Added');
  t.equal(sequencer.steps[3].options.name, 'invert', 'Correct Step Added');
  t.end();
});

test('addSteps("name",o) adds a step', function(t) {
  sequencer.addSteps('channel', {});
  t.equal(sequencer.steps.length, 5, 'Length of steps increased');
  t.equal(sequencer.steps[4].options.name, 'channel', 'Correct Step Added');
  t.end();
});

test('addSteps("name,name") adds two steps', function(t) {
  sequencer.addSteps('channel,invert');
  t.equal(sequencer.steps.length, 7, 'Length of steps increase');
  t.equal(sequencer.steps[5].options.name, 'channel', 'Correct Step Added');
  t.equal(sequencer.steps[6].options.name, 'invert', 'Correct Step Added');
  t.end();
});

test('addSteps("name{parameter:value},name{parameter:value}") adds two steps', function(t) {
  sequencer.addSteps('brightness{brightness:80},average{}');
  t.equal(sequencer.steps.length, 9, 'Length of steps increase');
  t.equal(sequencer.steps[7].options.name, 'brightness', 'Correct Step Added');
  t.equal(sequencer.steps[7].options.brightness, '80', 'Correct options loaded');
  t.equal(sequencer.steps[8].options.name, 'average', 'Correct Step Added');
  t.end();
});

test('addSteps("name{parameter:value}" adds a step', function(t) {
  sequencer.addSteps('brightness{brightness:1}');
  t.equal(sequencer.steps.length, 10, 'Length of steps increase');
  t.equal(sequencer.steps[9].options.name, 'brightness', 'Correct Step Added');
  t.equal(sequencer.steps[9].options.brightness, '1', 'Correct options loaded');
  t.end();
});

test('removeSteps(position) removes a step', function(t) {
  sequencer.removeSteps(1);
  t.equal(sequencer.steps.length, 9, 'Length of steps reduced');
  t.end();
});

test('removeSteps([positions]) removes steps', function(t) {
  sequencer.removeSteps([1, 2]);
  t.equal(sequencer.steps.length, 7, 'Length of steps reduced');
  t.end();
});

test('insertSteps(position,"module",options) inserts a step', function(t) {
  sequencer.insertSteps( 1, 'channel', {});
  t.equal(sequencer.steps.length, 8, 'Length of Steps increased');
  t.equal(sequencer.steps[1].options.name, 'channel', 'Correct Step Inserted');
  t.end();
});

test('insertSteps(position,"module") inserts a step', function(t) {
  sequencer.insertSteps(1, 'channel');
  t.equal(sequencer.steps.length, 9, 'Length of Steps increased');
  t.equal(sequencer.steps[1].options.name, 'channel', 'Correct Step Inserted');
  t.end();
});



test('getSteps() returns correct array of steps', function(t){
  var sequencer = ImageSequencer({ ui: false });
  sequencer.loadImages('test', red);
  sequencer.addSteps(['blur', 'invert']);
  var stepsArray = sequencer.getSteps('test');
  t.equal(stepsArray.length, sequencer.steps.length, 'getSteps() returns correct length of steps');
  var flag = 0;
  for (var i = 0; i < sequencer.steps.length; i++){
    if(stepsArray[i].options.name == (sequencer.steps[i].options.name))
      continue;
    else
      flag = 1;
  }
  t.equal(flag, 0, 'getSteps() returns correct array of steps');
  t.end();
});

test('run() runs the sequencer and returns output to callback', function(t) {
  sequencer.run({ mode: 'test' }, function(out) {
    t.equal(typeof (sequencer.steps[sequencer.steps.length - 1].output), 'object', 'Output is Generated');
    t.equal(out, sequencer.steps[sequencer.steps.length - 1].output.src, 'Output callback works');
    t.end();
  });
});

test('getStep(offset) returns the step at offset distance relative to current step', function(t) {
  sequencer.addSteps('invert', {});
  sequencer.addSteps('blend', {});
  sequencer.run({ mode: 'test' }, function(out) {
    t.equal(!!out, true, 'Blend generates output');
    t.end();
  });
});

test('toCliString() returns the CLI command for the sequence', function(t) {
  t.deepEqual(sequencer.toCliString(), 'sequencer -i [PATH] -s "channel channel channel channel invert brightness average brightness invert blend" -d \'{"channel":"green","brightness":"1","offset":-2}\'', 'works correctly');
  t.end();
});

test('blend returns different output depending on the set offset', function(t) {
  sequencer.addSteps('invert', {});
  sequencer.addSteps('invert', {});
  sequencer.addSteps('blend', {});
  // because we've added blend before, so instead of -3 we set it to -4
  sequencer.addSteps('blend', {'offset': -4});
  sequencer.run({ mode: 'test' }, function(out) {
    t.notStrictEqual(out, sequencer.steps[sequencer.steps.length - 2].output.src, 'different offsets give different output');
    t.end();
  });
});

test('replaceImage returns false in NodeJS', function(t) {
  var returnvalue = (sequencer.options.inBrowser) ? false : sequencer.replaceImage('#selector', 'test');
  t.equal(returnvalue, false, 'It does.');
  t.end();
});

var global2 = copy(false, parent);
test('No Global Variables Created', function(t) {
  t.equal(0, global2, 'None Created.');
  t.end();
});
