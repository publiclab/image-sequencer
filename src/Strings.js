module.exports = {
  // Genates a CLI string for the current sequence
  toCliString : function() {
    var cliStringSteps = `"`, cliOptions = {};
    for (var step in this.steps) {
      if (this.steps[step].options.name !== "load-image")
        cliStringSteps += `${this.steps[step].options.name} `;
      for (var inp in modulesInfo(this.steps[step].options.name).inputs) {
        cliOptions[inp] = this.steps[step].options[inp];
      }
    }
    cliStringSteps = cliStringSteps.substr(0, cliStringSteps.length - 1) + `"`;
    return `sequencer -i [PATH] -s ${cliStringSteps} -d '${JSON.stringify(cliOptions)}'`
  },

  // Strigifies the current sequence
  toString : function(step) {
    if (step) {
      return stepToString(step);
    } else {
      return copy(this.images.image1.steps).map(stepToString).slice(1).join(',');
    }
  },

  // Stringifies one step of the sequence
  stepToString: function(step) {
    let inputs = copy(modulesInfo(step.options.name).inputs);
    inputs = inputs || {};

    for (let input in inputs) {
      inputs[input] = step.options[input] || inputs[input].default;
      inputs[input] = encodeURIComponent(inputs[input]);
    }

    var configurations = Object.keys(inputs).map(key => key + ':' + inputs[key]).join('|');
    return `${step.options.name}{${configurations}}`;
  },

  // exports the current sequence as an array of JSON steps
  toJSON: function() {
    return this.stringToJSON(this.toString());
  },

  // Coverts stringified sequence into an array of JSON steps
  stringToJSON: function(str) {
    let steps;
    if (str.includes(','))
      steps = str.split(',');
    else
      steps = [str];
    return steps.map(stringToJSONstep);
  },

  // Converts one stringified step into JSON
  stringToJSONstep: function(str) {
    var bracesStrings;
    if (str.includes('{'))
      if (str.includes('(') && str.indexOf('(') < str.indexOf('{'))
        bracesStrings = ['(', ')'];
      else
        bracesStrings = ['{', '}'];
    else
      bracesStrings = ['(', ')'];

    if (str.indexOf(bracesStrings[0]) === -1) { // if there are no settings specified
      var moduleName = str.substr(0);
      stepSettings = "";
    } else {
      var moduleName = str.substr(0, str.indexOf(bracesStrings[0]));
      stepSettings = str.slice(str.indexOf(bracesStrings[0]) + 1, -1);
    }

    stepSettings = stepSettings.split('|').reduce(function formatSettings(accumulator, current, i) {
      var settingName = current.substr(0, current.indexOf(':')),
        settingValue = current.substr(current.indexOf(':') + 1);
      settingValue = settingValue.replace(/^\(/, '').replace(/\)$/, ''); // strip () at start/end
      settingValue = settingValue.replace(/^\{/, '').replace(/\}$/, ''); // strip {} at start/end
      settingValue = decodeURIComponent(settingValue);
      current = [
        settingName,
        settingValue
      ];
      if (!!settingName) accumulator[settingName] = settingValue;
      return accumulator;
    }, {});

    return {
      name: moduleName,
      options: stepSettings
    }
  },

  // imports a string into the sequencer steps
  importString: function(str) {
    let sequencer = this;
    if (this.name != "ImageSequencer")
      sequencer = this.sequencer;
    var stepsFromString = stringToJSON(str);
    stepsFromString.forEach(function eachStep(stepObj) {
      sequencer.addSteps(stepObj.name, stepObj.options);
    });
  },

  // imports a array of JSON steps into the sequencer steps
  importJSON: function(obj) {
    let sequencer = this;
    if (this.name != "ImageSequencer")
      sequencer = this.sequencer;
    obj.forEach(function eachStep(stepObj) {
      sequencer.addSteps(stepObj.name, stepObj.options);
    });
  }
}