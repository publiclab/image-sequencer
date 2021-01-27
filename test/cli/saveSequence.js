const test = require('tape');
const cli = require('../../src/cli');

test('testing save sequence function', function (t) {
  try {
    cli([
      'node', 'test',
      '--save-sequence',
      '"invert-colormap invert(),colormap()"',
    ]);
    t.true(1, 'creation success');
  } catch (error) {
    t.true(!error, 'creation fail');
  }
  try {
    cli(['node', 'test', '--save-sequence']);
    t.true(0, 'creation success');
  } catch (error) {
    t.true(1, 'creation fail');
  }
  t.end();
});
