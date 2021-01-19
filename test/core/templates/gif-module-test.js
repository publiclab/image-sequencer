const test = require('tape'),
  base64Img = require('base64-img');

const compare = require('resemblejs').compare;

const ImageSequencer = require('../../../src/ImageSequencer');

const test_gif = require('../images/test.gif.js');
target = 'test_outputs';

/**
 * @method ModuleTest.
 * @description a common test for modules.
 * @param {String} moduleName name of the module.
 * @param {"Object"} options module options.
 * @param {String} benchmark dataURI of the benchmark gif.
 * @param {String} [input="test_gif"] optional input image. Default is a test gif.
 */
module.exports = (moduleName, options, benchmark, input) => {
  let sequencer = ImageSequencer({ ui: false });
  sequencer.loadImages(input || test_gif);
  sequencer.addSteps(moduleName, options);
  test(`${moduleName} module works correctly`, (t) => {
    sequencer.run({ mode: 'test' }, () => {
      let result = sequencer.steps[1].output.src;

      base64Img.imgSync(result, target, `${moduleName}-result`);
      base64Img.imgSync(benchmark, target, `${moduleName}-benchmark`);

      let mismatch = 100;
      compare(
        result,
        benchmark,
        { returnEarlyThreshold: 5 },
        (err, { rawMisMatchPercentage }) => {
          if (err) {
            console.log('An error while comparing!');
          } else {
            mismatch = rawMisMatchPercentage;
          }
        }
      );

      t.equal(
        mismatch < 5,
        true,
        `${moduleName} module works correctly with Gif`
      );
      sequencer = null;
      t.end();
    });
  });
};
