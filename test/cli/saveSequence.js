require('../../src/ImageSequencer');
sequencer = ImageSequencer({ ui: true });
const saveSequence = require('../../src/cli/saveSequence.js');
const test = require('tape');
const cliTest = require('./templates/cli-test');

test('testing save sequence function', function (t) {
  try {
    let program = cliTest([
      '--save-sequence',
      '"invert-colormap invert(),colormap()"',
    ]);
    if (program.saveSequence) saveSequence(program, sequencer);
    t.true(1, 'creation success');
  } catch (error) {
    t.true(!error, 'creation fail');
  }
  try {
    let program = cliTest(['--save-sequence']);
    if (program.saveSequence) saveSequence(program, sequencer);
    t.true(0, 'creation success');
  } catch (error) {
    t.true(1, 'creation fail');
  }
  t.end();
});
