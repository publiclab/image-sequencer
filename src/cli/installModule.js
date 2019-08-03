var childProcess = require('child_process');
var Spinner = require('ora');

module.exports = function (program, sequencer) {
  console.log(
    '\x1b[33m%s\x1b[0m',
    'Please wait while your Module is being Installed...\nThis may take a while!'
  );

  var params = program.installModule.split(' ');
  var spinner = Spinner('Now Installing...').start();
  childProcess.execSync(`npm i ${params[1]}`);
  sequencer.saveNewModule(params[0], params[1]);
  sequencer.loadNewModule(params[0], require(params[1]));
  spinner.stop();
  console.log('\x1b[32m%s\x1b[0m', 'Your module was installed successfully!!');
};