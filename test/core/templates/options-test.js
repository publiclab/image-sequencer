const test = require('tape'),
  base64Img = require('base64-img'),
  looksSame = require('looks-same');

const ImageSequencer = require('../../../src/ImageSequencer');

const red =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';
target = 'test_outputs';

/**
 * @method optionsChangeTest
 * @description a common test for modules
 * @param {String} moduleName name of the module
 * @param {'Object'} [options] array of options
 * @param {String} [benchmark] dataURI of the benchmark images, a image for easch option
 * @param {String} [input='red_image'] optional input image. Default is a red image.
 */
module.exports = (moduleName, options, benchmark, input) => {
  let sequencer = ImageSequencer({ ui: false });

  test(`${moduleName} module works correctly with different options`, t => {
    sequencer.loadImages(input || red);
    sequencer.addSteps(moduleName, options[0]);
    sequencer.run({ mode: 'test' }, () => {
      let result = sequencer.steps[1].output.src;

      base64Img.imgSync(result, target, 'result');
      base64Img.imgSync(benchmark[0], target, 'benchmark');

      result = './test_outputs/result.png';
      benchmark[0] = './test_outputs/benchmark.png';

      looksSame(result, benchmark[0], function(err, res) {
        if (err) console.log(err);

        t.equal(res.equal, true, `${moduleName} module works correctly with initial option ${options[0][moduleName]}`);
      });
      sequencer.steps[1].setOptions(options[1]);
      sequencer.run({ mode: 'test' }, () => {
        let newResult = sequencer.steps[1].output.src;

        base64Img.imgSync(newResult, target, 'newResult');
        base64Img.imgSync(benchmark[1], target, 'benchmark');

        newResult = './test_outputs/newResult.png';
        benchmark[1] = './test_outputs/benchmark.png';

        looksSame(newResult, benchmark[1], function(err, res) {
          if (err) console.log(err);

          t.equal(res.equal, true, `${moduleName} module works correctly when the option is changed to ${options[1][moduleName]}`);
          sequencer = null;
          t.end();
        });
      });
    });
  });
};
