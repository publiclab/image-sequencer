#!/usr/bin/env node

require("./src/ImageSequencer");
sequencer = ImageSequencer({ ui: false });
var Spinner = require("ora");

var program = require("commander");
var readlineSync = require("readline-sync");

function exit(message) {
  console.error(message);
  process.exit(1);
}

program
  .version("0.1.0")
  .option("-i, --image [PATH/URL]", "Input image URL")
  .option("-s, --step [step-name]", "Name of the step to be added.")
  .option("-o, --output [PATH]", "Directory where output will be stored.")
  .option("-b, --basic", "Basic mode outputs only final image")
  .option("-c, --config [Object]", "Options for the step")
  .option("--save-sequence [string]", "Name space separated with Stringified sequence")
  .option('--install-module [string]', "Module name space seaprated npm package name")
  .parse(process.argv);

if (program.saveSequence) {
  var params = program.saveSequence.split(' ');
  sequencer.saveSequence(params[0], params[1]);
} else if (program.installModule) {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Please wait while your Module is being Installed...\nThis may take a while!"
  );
  
  var params = program.installModule.split(' ');
  var spinner = Spinner("Now Installing...").start();
  require('child_process').execSync(`npm i ${params[1]}`)
  sequencer.saveNewModule(params[0], params[1]);
  sequencer.loadNewModule(params[0], require(params[1]));
  spinner.stop();
} else {
  // Parse step into an array to allow for multiple steps.
  if (!program.step) exit("No steps passed");
  program.step = program.step.split(" ");

  // User must input an image.
  if (!program.image) exit("Can't read file.");

  // User must input an image.
  require("fs").access(program.image, function(err) {
    if (err) exit("Can't read file.");
  });

  // User must input a step. If steps exist, check that every step is a valid step.
  if (!program.step || !validateSteps(program.step))
    exit("Please ensure all steps are valid.");

  // If there's no user defined output directory, select a default directory.
  program.output = program.output || "./output/";

  // Set sequencer to log module outputs, if any.
  sequencer.setUI({
    onComplete: function(step) {
      // Get information of outputs.
      step.info = sequencer.modulesInfo(step.name);

      for (var output in step.info.outputs) {
        console.log("[" + program.step + "]: " + output + " = " + step[output]);
      }
    }
  });

  // Finally, if everything is alright, load the image, add the steps and run the sequencer.
  sequencer.loadImages(program.image, function() {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      "Please wait \n output directory generated will be empty until the execution is complete"
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
    require("./src/CliUtils").makedir(program.output, () => {
      console.log('Files will be exported to "' + program.output + '"');

      if (program.basic)
        console.log("Basic mode is enabled, outputting only final image");

      // Iterate through the steps and retrieve their inputs.
      program.step.forEach(function(step) {
        var options = Object.assign({}, sequencer.modulesInfo(step).inputs);

        // If inputs exists, print to console.
        if (Object.keys(options).length) {
          console.log("[" + step + "]: Inputs");
        }

        // If inputs exists, print them out with descriptions.
        Object.keys(options).forEach(function(input) {
          // The array below creates a variable number of spaces. This is done with (length + 1).
          // The extra 4 that makes it (length + 5) is to account for the []: characters
          console.log(
            new Array(step.length + 5).join(" ") +
            input +
            ": " +
            options[input].desc
          );
        });

        if (program.config) {
          try {
            var config = JSON.parse(program.config);
            console.log(`The parsed options object: `, config);
          } catch (e) {
            console.error(
              "\x1b[31m%s\x1b[0m",
              `Options(Config) is not a not valid JSON Fallback activate`
            );
            program.config = false;
            console.log(e);
          }
        }
        if (program.config && validateConfig(config, options)) {
          console.log("Now using Options object");
          Object.keys(options).forEach(function(input) {
            options[input] = config[input];
          });
        } else {
          // If inputs exist, iterate through them and prompt for values.
          Object.keys(options).forEach(function(input) {
            var value = readlineSync.question(
              "[" +
              step +
              "]: Enter a value for " +
              input +
              " (" +
              options[input].type +
              ", default: " +
              options[input].default +
              "): "
            );
            options[input] = value;
          });
        }
        // Add the step and its inputs to the sequencer.
        sequencer.addSteps(step, options);
      });

      var spinnerObj = { succeed: () => { }, stop: () => { } };
      if (!process.env.TEST)
        spinnerObj = Spinner("Your Image is being processed..").start();

      // Run the sequencer.
      sequencer.run({ progressObj: spinnerObj }, function() {
        // Export all images or final image as binary files.
        sequencer.exportBin(program.output, program.basic, outputFilename);

        //check if spinner was not overriden stop it
        if (!spinnerObj.overrideFlag) {
          spinnerObj.succeed();
          console.log(`\nDone!!`);
        }
      });
    });
  });

  // Takes an array of steps and checks if they are valid steps for the sequencer.
  function validateSteps(steps) {
    // Assume all are valid in the beginning.
    var valid = true;
    steps.forEach(function(step) {
      // If any step in the array is not valid (not a property of modulesInfo), set valid to false.
      if (!sequencer.modulesInfo().hasOwnProperty(step)) {
        valid = false;
      }
    });

    // Return valid. (If all of the steps are valid properties, valid will have remained true).
    return valid;
  }

  //Takes config and options object and checks if all the keys exist in config
  function validateConfig(config_, options_) {
    options_ = Object.keys(options_);
    if (
      (function() {
        for (var input in options_) {
          if (!config_[options_[input]]) {
            console.error(
              "\x1b[31m%s\x1b[0m",
              `Options Object does not have the required details "${
              options_[input]
              }" not specified. Fallback case activated`
            );
            return false;
          }
        }
      })() == false
    )
      return false;
    else return true;
  }
}
