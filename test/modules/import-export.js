var test = require('tape');
require('../../src/ImageSequencer.js');

var sequencer = ImageSequencer({ ui: false });
var red = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";

test('toString() and stepToString() return the step/steps in string format',function(t){
  sequencer.loadImages('image1', red);
  sequencer.addSteps('channel');
  sequencer.addSteps('invert');
  t.equal(sequencer.toString(),"channel(channel:green),invert()","toString works");
  t.equal(sequencer.stepToString(sequencer.steps[1]),"channel(channel:green)","stepToString works");
  t.end();
});
test('importStringtoJson() and importStringtoJsonStep() return the step/steps from a string',function(t){
  t.deepEqual(sequencer.importStringtoJson('channel(channel:green),invert(),blend(blend:function(r1%2C%20g1%2C%20b1%2C%20a1%2C%20r2%2C%20g2%2C%20b2%2C%20a2)%20%7B%20return%20%5B%20r1%2C%20g2%2C%20b2%2C%20a2%20%5D%20%7D)'),[
    { name: 'channel', options: { channel: 'green' } },
    { name: 'invert', options: {} },
    { name: 'blend', options: { blend: 'function(r1, g1, b1, a1, r2, g2, b2, a2) { return [ r1, g2, b2, a2 ] }' } }
  ]);
  t.deepEqual(sequencer.importStringtoJsonStep("channel(channel:green)"),{ name: 'channel', options: { channel: 'green' } });
  t.end();
});