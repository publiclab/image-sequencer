const { parseOptions } = require('commander');
const { Command } = require('commander');

/**
 * @method cliTest
 * @description returns a new commander instance after parsing the provided arguements
 * @param {string[]} args Array of arguements to by parsed via commander
 */

module.exports = (args) => {
  let program = new Command();
  program
    .option('-i, --image [PATH/URL]', 'Input image URL')
    .option('-s, --step [step-name]', 'Name of the step to be added.')
    .option('-o, --output [PATH]', 'Directory where output will be stored.')
    .option('-b, --basic', 'Basic mode outputs only final image')
    .option('-c, --config [Object]', 'Options for the step')
    .option(
      '--save-sequence [string]',
      'Name space separated with Stringified sequence'
    )
    .option(
      '--install-module [string]',
      'Module name space seaprated npm package name'
    );

  const parseOptions = ['node', 'test', ...args];

  console.log(parseOptions);

  program.parse(parseOptions);

  return program;
};
