var fs = require('fs');

/*
* This function checks if the directory exists, if not it creates one on the given path
* Callback is called with argument error if an error is encountered
*/
function makedir(path, callback){
  fs.access(path, function(err){
    if(err) fs.mkdir(path, function(err){
      if(err) callback(err);
      callback();
    });
    else callback();
  });
}

// Takes an array of steps and checks if they are valid steps for the sequencer.
function validateSteps(steps, sequencer) {
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
            '\x1b[31m%s\x1b[0m',
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

module.exports = exports = {
  makedir: makedir,
  validateSteps: validateSteps,
  validateConfig: validateConfig
};