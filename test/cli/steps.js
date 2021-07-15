const test = require('tape');
const cli = require('../../src/cli');
const stdout = require('./util/readConsole').stdout;
const stderr = require('./util/readConsole').stderr;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test('testing steps parsing', function (t) {

  t.plan(1);

  let out = stdout.read();

  cli([
    'node', 'test',
    '-i', 'examples/images/test.png',
    '-s', 'invert',
  ]);

  sleep(1000).then(() => {
    out.restore();
    let validator = out.output().includes('Added Step "invert"');
    t.true(validator, 'Steps parsed successfully');
  });


//   let err = stderr.read();
//   await cli([
//     'node', 'test',
//     '-i', 'examples/images/test.png',
//     '-s', 'invalidStep',
//   ]);
//   err.restore();
//   t.equal(err.output, 'Please ensure all steps are valid.');
});
