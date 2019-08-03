const test = require('tape'),
  base64Img = require('base64-img'),
  looksSame = require('looks-same');

const ImageSequencer = require('../../../src/ImageSequencer');

const red = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';
target = 'test_outputs';

/**
 * @method moduleTest
 * @description a common test for modules
 * @param {String} moduleName name of the module
 * @param {"Object"} options module options
 * @param {String} benchmark dataURI of the benchmark image
 * @param {String} [input="red_image"] optional input image. Default is a red image.
 */
module.exports = (moduleName, options, benchmark, input) => {
  let sequencer = ImageSequencer({ui: false});

  test(`${moduleName} module loads correctly`, t => {
    sequencer.loadImages(input || red);
    sequencer.addSteps(moduleName, options);

    t.equal(sequencer.steps[1].options.name, moduleName, `${moduleName} module is getting loaded`);
    t.end();
  });

  test(`${moduleName} module loads with correct options`, t => {
    for (const option in options) {
      t.equal(sequencer.steps[1].options[option], options[option], `Option ${option} is correct`);
    }

    t.end();
  });

  test(`${moduleName} module works correctly`, t => {
    sequencer.run({mode: 'test'}, () => {
      let result = sequencer.steps[1].output.src;

      base64Img.imgSync(result, target, 'result');
      base64Img.imgSync(benchmark, target, 'benchmark');

      result = './test_outputs/result.png';
      benchmark = './test_outputs/benchmark.png';

      looksSame(result, benchmark, function(err, res) {
        if (err) console.log(err);

        t.equal(res.equal, true, `${moduleName} module works correctly`);
        sequencer = null;
        t.end();
      });
    });
  });
  
};