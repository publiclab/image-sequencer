var Spinner = require('ora');
var readlineSync = require('readline-sync');
var utils  = require('../CliUtils');

module.exports = function (program, sequencer, outputFilename) {
  utils.makedir(program.output, () => {
    console.log('Files will be exported to "' + program.output + '"');

    if (program.basic)
      console.log('Basic mode is enabled, outputting only final image');

    // Iterate through the steps and retrieve their inputs.
    program.step.forEach(function(step) {
      var options = Object.assign({}, sequencer.modulesInfo(step).inputs);

      // If inputs exists, print to console.
      if (Object.keys(options).length) {
        console.log('[' + step + ']: Inputs');
      }

      // If inputs exists, print them out with descriptions.
      Object.keys(options).forEach(function(input) {
        // The array below creates a variable number of spaces. This is done with (length + 1).
        // The extra 4 that makes it (length + 5) is to account for the []: characters
        console.log(
          new Array(step.length + 5).join(' ') +
          input +
          ': ' +
          options[input].desc
        );
      });

      if (program.config) {
        try {
          var config = JSON.parse(program.config);
          console.log('The parsed options object: ', config);
        } catch (e) {
          console.error(
            '\x1b[31m%s\x1b[0m',
            'Options(Config) is not a not valid JSON Fallback activate'
          );
          program.config = false;
          console.log(e);
        }
      }
      if (program.config && utils.validateConfig(config, options)) {
        console.log('Now using Options object');
        Object.keys(options).forEach(function(input) {
          options[input] = config[input];
        });
      } else {
        // If inputs exist, iterate through them and prompt for values.
        Object.keys(options).forEach(function(input) {
          var value = readlineSync.question(
            '[' +
            step +
            ']: Enter a value for ' +
            input +
            ' (' +
            options[input].type +
            ', default: ' +
            options[input].default +
            '): '
          );
          options[input] = value;
        });
      }
      // Add the step and its inputs to the sequencer.
      sequencer.addSteps(step, options);
    });

    var spinnerObj = { succeed: () => { }, stop: () => { } };
    if (!process.env.TEST)
      spinnerObj = Spinner('Your Image is being processed..').start();

    // Run the sequencer.
    sequencer.run({ progressObj: spinnerObj }, function() {
      // Export all images or final image as binary files.
      sequencer.exportBin(program.output, program.basic, outputFilename);

      //check if spinner was not overriden stop it
      if (!spinnerObj.overrideFlag) {
        spinnerObj.succeed();
        console.log('\nDone!!');
      }
    });
  });
};