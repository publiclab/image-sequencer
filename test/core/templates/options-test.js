const test = require('tape'),
  base64Img = require('base64-img'),
  looksSame = require('looks-same');

const ImageSequencer = require('../../../src/ImageSequencer');

const red =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';
target = 'test_outputs';

/**
 * @method OptionsChangeTest.
 * @description a common test for modules.
 * @param {String} moduleName name of the module.
 * @param {'Object'} [options] array of options.
 * @param {String} [benchmark] path to the benchmark images, a image for each option.
 * @param {String} [input='red_image'] optional input image. Default is a red image.
 */
module.exports = (moduleName, options, benchmark, input) => {
  let sequencer = ImageSequencer({ ui: false });

  test(`${moduleName} module works correctly with different options`, t => {
    // Load the input image.
    sequencer.loadImages(input || red);
    // Add the step.
    sequencer.addSteps(moduleName, options[0]);
    // Run the ImageSequencer with initial option.
    sequencer.run(() => {
      let result = sequencer.steps[1].output.src;
      let benchmarkDataUri = base64Img.base64Sync(benchmark[0]);

      base64Img.imgSync(result, target, `${moduleName}-result1`);
      base64Img.imgSync(benchmarkDataUri, target, `${moduleName}-benchmark1`);

      // Check to see if first option is correctly loaded.
      result = `./test_outputs/${moduleName}-result1.png`;
      benchmark[0] = `./test_outputs/${moduleName}-benchmark1.png`;
      // Check to see if first option is correctly loaded.
      looksSame(result, benchmark[0], function(err, res) {
        if (err) console.log(err);

        t.equal(res.equal, true, `${moduleName} module works correctly with initial option ${options[0][moduleName]}`);
      });

      // Change the option of the given module.
      sequencer.steps[1].setOptions(options[1]);
      // Run the ImageSequencer with changed option.
      sequencer.run(() => {
        let newResult = sequencer.steps[1].output.src;
        let newBenchmarkDataUri = base64Img.base64Sync(benchmark[1]);

        base64Img.imgSync(newResult, target, `${moduleName}-result2`);
        base64Img.imgSync(newBenchmarkDataUri, target, `${moduleName}-benchmark2`);

        newResult = `./test_outputs/${moduleName}-result2.png`;
        benchmark[1] = `./test_outputs/${moduleName}-benchmark2.png`;
        looksSame(newResult, benchmark[1], function(err, res){
          if(err) console.log(err);

          t.equal(res.equal, true, `${moduleName} module works correctly when the option is changed to ${options[1][moduleName]}`);
          sequencer = null;
          t.end();
        });
      });
    });
  });
};
