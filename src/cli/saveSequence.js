module.exports = function (program, sequencer) {

  var params = program.saveSequence.split(' ');
  sequencer.saveSequence(params[0], params[1]);
  console.log('\x1b[32m', 'Your sequence was saved successfully!!');

};