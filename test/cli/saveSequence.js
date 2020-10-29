require('../../src/ImageSequencer');
sequencer = ImageSequencer({ ui: true });
const saveSequence = require('../../src/cli/saveSequence.js');
const test = require('tape');
const { Command } = require('commander');


test('testing save sequence function', function (t) {
  try {
    let program = new Command();
    program
      .option('--save-sequence [string]', 'Name space separated with Stringified sequence');

    program.parse(['node', 'test', '--save-sequence', '"invert brightness"']);

    if (program.saveSequence)
      saveSequence(program, sequencer);
    t.true(1, 'creation success');

  } catch (error) {
    t.true(!error, 'creation fail');
  }
  try {
    let program = new Command();
    program
      .option('--save-sequence [string]', 'Name space separated with Stringified sequence');

    program.parse(['node', 'test', '--save-sequence']);

    if (program.saveSequence)
      saveSequence(program, sequencer);
    t.true(0, 'creation success');

  } catch (error) {
    t.true(1, 'creation fail');
  }
  t.end();
});