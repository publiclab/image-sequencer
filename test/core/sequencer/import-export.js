var test = require('tape');
require('../../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var red = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z';

test('toString() and stepToString() return the step/steps in string format', function(t) {
  sequencer.loadImages(red);
  sequencer.addSteps('channel');
  sequencer.addSteps('invert');
  t.equal(sequencer.toString(), 'channel{},invert{}', 'toString works');
  t.equal(sequencer.stepToString(sequencer.steps[1]), 'channel{}', 'stepToString works');
  t.end();
});

test('stringToJSON() and stringToJSONstep() return the step/steps from a string', function(t) {
  t.deepEqual(sequencer.stringToJSON('channel{channel:green},invert{},crop{x:0|y:0|w:50%25|h:50%25},blend{blend:function(r1%2C%20g1%2C%20b1%2C%20a1%2C%20r2%2C%20g2%2C%20b2%2C%20a2)%20%7B%20return%20%5B%20r1%2C%20g2%2C%20b2%2C%20a2%20%5D%20%7D}'), [
    { name: 'channel', options: { channel: 'green' } },
    { name: 'invert', options: {} },
    { name: 'crop', options: { x: '0', y: '0', w: '50%', h: '50%' } },
    { name: 'blend', options: { blend: 'function(r1, g1, b1, a1, r2, g2, b2, a2) { return [ r1, g2, b2, a2 ] }' } }
  ]);
  t.deepEqual(sequencer.stringToJSONstep('channel{channel:green}'), { name: 'channel', options: { channel: 'green' } });
  t.end();
});

test('stringToJSON() and stringToJSONstep() return the step/steps from a string without configs, using defaults', function(t) {
  t.deepEqual(sequencer.stringToJSON('channel,blur,invert,blend'), [
    { name: 'channel', options: {} },
    { name: 'blur', options: {} },
    { name: 'invert', options: {} },
    { name: 'blend', options: {} }
  ]);
  t.end();
});

test('toJSON() returns the right sequence of steps', function(t) {
  t.deepEqual(sequencer.toJSON(), [
    { name: 'channel', options: {} },
    { name: 'invert', options: {} }
  ]);
  t.end();
});

test('importString() imports a string of steps into the sequencer', function(t) {
  sequencer.importString('brightness{brightness:50},invert');
  t.equal(sequencer.toString(), 'channel{},invert{},brightness{brightness:50},invert{}');
  t.end();
});

test('importJSON() imports a JSON array of steps into the sequencer', function(t) {
  sequencer.importJSON([
    { name: 'blur', options: {} }
  ]);
  t.equal(sequencer.toString(), 'channel{},invert{},brightness{brightness:50},invert{},blur{}');
  t.end();
});

