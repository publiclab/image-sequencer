const test = require('tape'),
  ImageSequencer = require('../../../src/ImageSequencer');

const red = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';

/**
 * @method moduleTest
 * @description a common test for modules
 * @param {String} moduleName name of the module
 * @param {"Object"} options module options
 * @param {String} [input="red_image"] optional input image. Default is a red image.
 */
module.exports = (moduleName, options, input) => {
  let sequencer = ImageSequencer({
    ui: false
  });
  sequencer.loadImages(input || red);
  sequencer.addSteps(moduleName, options);

  test(`${moduleName}`, t => {
    var startTime = new Date().getMilliseconds();
    sequencer.run({
      mode: 'test'
    }, () => {
      var endTime = new Date().getMilliseconds();
      console.log(`${moduleName} ran in ${(endTime - startTime)} milliseconds`);
      sequencer = null;
      t.end();
    });
  });

};