'use strict';

var fs = require('fs');
var test = require('tape');
var DataURItoBuffer = require('data-uri-to-buffer');
require('events').EventEmitter.prototype.setMaxListeners(100);

ImageSequencer = require('../../../src/ImageSequencer.js');

var image = 'data:image/png;base64,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';

var imageName = 'image1';

test('benchmark all modules', function(t) {
  var sequencerDefault = ImageSequencer({ ui: false, inBrowser: false, useWasm:false });

  console.log('############ Benchmarks ############');
  runBenchmarks(sequencerDefault, t);
  console.log('####################################');

});

test('benchmark all modules with WebAssembly', function(t) {
  var sequencerWebAssembly = ImageSequencer({ ui: false, inBrowser: false, useWasm: true });

  console.log('############ Benchmarks with WebAssembly ############');
  runBenchmarks(sequencerWebAssembly, t);
  console.log('####################################');
});

function runBenchmarks(sequencer, t) {
  var mods = Object.keys(sequencer.modules);

  sequencer.loadImages(image);
  while ((mods[0] === 'import-image' || (!!sequencer.modulesInfo(mods[0]).requires && sequencer.modulesInfo(mods[0]).requires.includes('webgl'))))
    mods.splice(0, 1);
  sequencer.addSteps(mods[0]);
  global.start = Date.now();
  global.idx = 0;
  sequencer.run(cb);

  function cb() {
    var end = Date.now();
    console.log('Module ' + mods[0] + ' ran in: ' + (end - global.start) + ' milliseconds');
    mods.splice(0, 1);
    if (mods.length > 1) { // Last one is test module, we need not benchmark it
      sequencer.steps[global.idx].output.src = image;
      global.idx++;
      if (mods[0] === 'import-image' || (!!sequencer.modulesInfo(mods[0]).requires && sequencer.modulesInfo(mods[0]).requires.includes('webgl'))) {
        /* Not currently working for this module, which is for importing a new image */
        console.log('Bypassing import-image');
        mods.splice(0, 1);
      }
      sequencer.addSteps(mods[0]);
      global.start = Date.now();
      sequencer.run({ index: global.idx }, cb);
    } else {
      t.end();
    }
  }
}
