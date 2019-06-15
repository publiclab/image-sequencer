#!/usr/bin/env node

require('./src/ImageSequencer');
sequencer = ImageSequencer({ ui: true });
var fs = require('fs');
var program = require('commander');
var utils = require('./src/CliUtils');

var saveSequence = require('./src/cli/saveSequence.js');
var installModule = require('./src/cli/installModule.js');
var sequencerSteps = require('./src/cli/sequencerSteps.js');

function exit(message) {
  console.error(message);
  process.exit(1);
}

program
  .version('0.1.0')
  .option('-i, --image [PATH/URL]', 'Input image URL')
  .option('-s, --step [step-name]', 'Name of the step to be added.')
  .option('-o, --output [PATH]', 'Directory where output will be stored.')
  .option('-b, --basic', 'Basic mode outputs only final image')
  .option('-c, --config [Object]', 'Options for the step')
  .option('--save-sequence [string]', 'Name space separated with Stringified sequence')
  .option('--install-module [string]', 'Module name space seaprated npm package name')
  .parse(process.argv);

if (program.saveSequence) saveSequence(program, sequencer);

else if (program.installModule) installModule(program, sequencer);

else {
  // Parse step into an array to allow for multiple steps.
  if (!program.step) exit('No steps passed');
  program.step = program.step.split(' ');

  // User must input an image.
  if (!program.image) exit('Can\'t read file.');

  // User must input an image.
  fs.access(program.image, function(err) {
    if (err) exit('Can\'t read file.');
  });

  // User must input a step. If steps exist, check that every step is a valid step.
  if (!program.step || !(utils.validateSteps(program.step, sequencer)))
    exit('Please ensure all steps are valid.');

  // If there's no user defined output directory, select a default directory.
  program.output = program.output || './output/';

  // Set sequencer to log module outputs, if any.
  sequencer.setUI({
    onComplete: function(step) {
      // Get information of outputs.
      step.info = sequencer.modulesInfo(step.name);

      for (var output in step.info.outputs) {
        console.log('[' + program.step + ']: ' + output + ' = ' + step[output]);
      }
    },
    notify: function(msg) {
      console.log('\x1b[36m%s\x1b[0m', '🌟  ' + msg);
    }
  });

  // Finally, if everything is alright, load the image, add the steps and run the sequencer.
  sequencer.loadImages(program.image, function() {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      'Please wait \n output directory generated will be empty until the execution is complete'
    );

    //Generate the Output Directory
    var outputFilename = program.output.split('/').slice(-1)[0];
    if (outputFilename.includes('.')) {
      // user did give an output filename we have to remove it from dir
      program.output = program.output.split('/').slice(0, -1).join('/');
    }
    else {
      outputFilename = null;
    }

    sequencerSteps(program, sequencer, outputFilename);

  });

}
