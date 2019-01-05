if (typeof window !== 'undefined') { isBrowser = true }
else { var isBrowser = false }
require('./util/getStep.js');

ImageSequencer = function ImageSequencer(options) {

  var sequencer = (this.name == "ImageSequencer") ? this : this.sequencer;
  options = options || {};
  options.inBrowser = options.inBrowser || isBrowser;
  options.sequencerCounter = 0;

  function objTypeOf(object) {
    return Object.prototype.toString.call(object).split(" ")[1].slice(0, -1)
  }

  function log(color, msg) {
    if (options.ui != "none") {
      if (arguments.length == 1) console.log(arguments[0]);
      else if (arguments.length == 2) console.log(color, msg);
    }
  }

  function copy(a) {
    if (!typeof (a) == "object") return a;
    if (objTypeOf(a) == "Array") return a.slice();
    if (objTypeOf(a) == "Object") {
      var b = {};
      for (var v in a) {
        b[v] = copy(a[v]);
      }
      return b;
    }
    return a;
  }

  function makeArray(input) {
    return (objTypeOf(input) == "Array") ? input : [input];
  }

  var image,
    steps = [],
    modules = require('./Modules'),
    sequences = require('./SavedSequences.json'),
    formatInput = require('./FormatInput'),
    images = {},
    inputlog = [],
    events = require('./ui/UserInterface')(),
    fs = require('fs');



  if (options.inBrowser) {
    for (o in sequencer) {
      modules[o] = sequencer[o];
    }
    sequences = JSON.parse(window.localStorage.getItem('sequences'));
    if (!sequences) {
      sequences = {};
      window.localStorage.setItem('sequences', JSON.stringify(sequences));
    }
  }

  // if in browser, prompt for an image
  // if (options.imageSelect || options.inBrowser) addStep('image-select');
  // else if (options.imageUrl) loadImage(imageUrl);

  function addSteps() {
    var this_ = (this.name == "ImageSequencer") ? this : this.sequencer;
    var args = (this.name == "ImageSequencer") ? [] : [this.images];
    var json_q = {};
    for (var arg in arguments) { args.push(copy(arguments[arg])); }
    json_q = formatInput.call(this_, args, "+");

    inputlog.push({ method: "addSteps", json_q: copy(json_q) });

    for (var i in json_q)
      for (var j in json_q[i])
        require("./AddStep")(this_, i, json_q[i][j].name, json_q[i][j].o);

    return this;
  }

  function removeStep(image, index) {
    //remove the step from images[image].steps and redraw remaining images
    if (index > 0) {
      thisStep = images[image].steps[index];
      thisStep.UI.onRemove(thisStep.options.step);
      images[image].steps.splice(index, 1);
    }
    //tell the UI a step has been removed
  }

  function removeSteps(image, index) {
    var run = {}, indices;
    var this_ = (this.name == "ImageSequencer") ? this : this.sequencer;
    var args = (this.name == "ImageSequencer") ? [] : [this.images];
    for (var arg in arguments) args.push(copy(arguments[arg]));

    var json_q = formatInput.call(this_, args, "-");
    inputlog.push({ method: "removeSteps", json_q: copy(json_q) });

    for (var img in json_q) {
      indices = json_q[img].sort(function(a, b) { return b - a });
      run[img] = indices[indices.length - 1];
      for (var i in indices)
        removeStep(img, indices[i]);
    }
    // this.run(run); // This is creating problems
    return this;
  }

  function insertSteps(image, index, name, o) {
    var run = {};
    var this_ = (this.name == "ImageSequencer") ? this : this.sequencer;
    var args = (this.name == "ImageSequencer") ? [] : [this.images];
    for (var arg in arguments) args.push(arguments[arg]);

    var json_q = formatInput.call(this_, args, "^");
    inputlog.push({ method: "insertSteps", json_q: copy(json_q) });

    for (var img in json_q) {
      var details = json_q[img];
      details = details.sort(function(a, b) { return b.index - a.index });
      for (var i in details)
        require("./InsertStep")(this_, img, details[i].index, details[i].name, details[i].o);
      run[img] = details[details.length - 1].index;
    }
    // this.run(run); // This is Creating issues
    return this;
  }

  // Config is an object which contains the runtime configuration like progress bar
  // information and index from which the sequencer should run
  function run(config, t_image, t_from) {
    let progressObj, index = 0;
    config = config || { mode: 'no-arg' };
    if (config.index) index = config.index;

    if (config.mode != 'test') {
      if (config.mode != "no-arg" && typeof config != 'function') {
        if (config.progressObj) progressObj = config.progressObj;
        delete arguments['0'];
      }
    }
    else {
      arguments['0'] = config.mode;
    }

    var this_ = (this.name == "ImageSequencer") ? this : this.sequencer;
    var args = (this.name == "ImageSequencer") ? [] : [this.images];
    for (var arg in arguments) args.push(copy(arguments[arg]));

    var callback = function() { };
    for (var arg in args)
      if (objTypeOf(args[arg]) == "Function")
        callback = args.splice(arg, 1)[0];

    var json_q = formatInput.call(this_, args, "r");

    require('./Run')(this_, json_q, callback, index, progressObj);

    return true;
  }

  function loadImages() {
    var args = [];
    var sequencer = this;
    for (var arg in arguments) args.push(copy(arguments[arg]));
    var json_q = formatInput.call(this, args, "l");

    inputlog.push({ method: "loadImages", json_q: copy(json_q) });
    var loadedimages = this.copy(json_q.loadedimages);

    var ret = {
      name: "ImageSequencer Wrapper",
      sequencer: this,
      addSteps: this.addSteps,
      removeSteps: this.removeSteps,
      insertSteps: this.insertSteps,
      run: this.run,
      UI: this.UI,
      setUI: this.setUI,
      images: loadedimages
    };

    function load(i) {
      if (i == loadedimages.length) {
        json_q.callback.call(ret);
        return;
      }
      var img = loadedimages[i];
      require('./ui/LoadImage')(sequencer, img, json_q.images[img], function() {
        load(++i);
      });
    }

    load(0);
  }

  function replaceImage(selector, steps, options) {
    options = options || {};
    options.callback = options.callback || function() { };
    return require('./ReplaceImage')(this, selector, steps, options);
  }

  function setUI(UI) {
    this.events = require('./ui/UserInterface')(UI);
  }

  var exportBin = function(dir, basic, filename) {
    return require('./ExportBin')(dir, this, basic, filename);
  }

  function modulesInfo(name) {
    var modulesdata = {}
    if (name == "load-image") return {};
    if (arguments.length == 0) {
      for (var modulename in this.modules) {
        modulesdata[modulename] = modules[modulename][1];
      }
      for (var sequencename in this.sequences) {
        modulesdata[sequencename] = { name: sequencename, steps: this.sequences[sequencename] };
      }
    }
    else {
      if (modules[name])
        modulesdata = modules[name][1];
      else
        modulesdata = { 'inputs': sequences[name]['options'] };
    }
    return modulesdata;
  }

  // Genates a CLI string for the current sequence
  function toCliString() {
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
  }

  // Strigifies the current sequence
  function toString(step) {
    if (step) {
      return stepToString(step);
    } else {
      return copy(this.images.image1.steps).map(stepToString).slice(1).join(',');
    }
  }

  // Stringifies one step of the sequence
  function stepToString(step) {
    let inputs = modulesInfo(step.options.name).inputs || {}, op = {};

    for (let input in inputs) {

      if (!!step.options[input] && step.options[input] != inputs[input].default) {
        op[input] = step.options[input];
        op[input] = encodeURIComponent(op[input]);
      }

    }

    var configurations = Object.keys(op).map(key => key + ':' + op[key]).join('|');
    return `${step.options.name}{${configurations}}`;
  }

  // exports the current sequence as an array of JSON steps
  function toJSON() {
    return this.stringToJSON(this.toString());
  }

  // Coverts stringified sequence into an array of JSON steps
  function stringToJSON(str) {
    let steps;
    if (str.includes(','))
      steps = str.split(',');
    else
      steps = [str];
    return steps.map(stringToJSONstep);
  }

  // Converts one stringified step into JSON
  function stringToJSONstep(str) {
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
  }

  // imports a string into the sequencer steps
  function importString(str) {
    let sequencer = this;
    if (this.name != "ImageSequencer")
      sequencer = this.sequencer;
    var stepsFromString = stringToJSON(str);
    stepsFromString.forEach(function eachStep(stepObj) {
      sequencer.addSteps(stepObj.name, stepObj.options);
    });
  }

  // imports a array of JSON steps into the sequencer steps
  function importJSON(obj) {
    let sequencer = this;
    if (this.name != "ImageSequencer")
      sequencer = this.sequencer;
    obj.forEach(function eachStep(stepObj) {
      sequencer.addSteps(stepObj.name, stepObj.options);
    });
  }

  function loadNewModule(name, options) {

    if (!options) {
      return this;

    } else if (Array.isArray(options)) {
      // contains the array of module and info
      this.modules[name] = options;

    } else if (options.func && options.info) {
      // passed in options object
      this.modules[name] = [
        options.func, options.info
      ];

    } else if (options.path && !this.inBrowser) {
      // load from path(only in node)
      const module = [
        require(`${options.path}/Module.js`),
        require(`${options.path}/info.json`)
      ];
      this.modules[name] = module;
    }
    return this;
  }

  function saveNewModule(name, path) {
    if (options.inBrowser) {
      // Not for browser context
      return;
    }
    var mods = fs.readFileSync('./src/Modules.js').toString();
    mods = mods.substr(0, mods.length - 1) + "  '" + name + "': require('" + path + "'),\n}";
    fs.writeFileSync('./src/Modules.js', mods);
  }

  function createMetaModule(stepsCollection, info) {
    var stepsArr = stepsCollection;
    if (typeof stepsCollection === 'string')
      stepsArr = stringToJSON(stepsCollection);
    var metaMod = function() {
      this.expandSteps(stepsArr);
      return {
        isMeta: true
      }
    }
    return [metaMod, info];
  }

  function saveSequence(name, sequenceString) {
    const sequence = stringToJSON(sequenceString);
    // Save the given sequence string as a module
    if (options.inBrowser) {
      // Inside the browser we save the meta-modules using the Web Storage API
      var sequences = JSON.parse(window.localStorage.getItem('sequences'));
      sequences[name] = sequence;
      window.localStorage.setItem('sequences', JSON.stringify(sequences));
    }
    else {
      // In node we save the sequences in the json file SavedSequences.json
      var sequences = require('./SavedSequences.json');
      sequences[name] = sequence;
      fs.writeFileSync('./src/SavedSequences.json', JSON.stringify(sequences));
    }
  }

  function loadModules() {
    // This function loads the modules and saved sequences
    this.modules = require('./Modules');
    if (options.inBrowser)
      this.sequences = JSON.parse(window.localStorage.getItem('sequences'));
    else
      this.sequences = require('./SavedSequences.json');
  }

  return {
    //literals and objects
    name: "ImageSequencer",
    options: options,
    inputlog: inputlog,
    modules: modules,
    sequences: sequences,
    images: images,
    events: events,

    //user functions
    loadImages: loadImages,
    loadImage: loadImages,
    addSteps: addSteps,
    removeSteps: removeSteps,
    insertSteps: insertSteps,
    replaceImage: replaceImage,
    run: run,
    setUI: setUI,
    exportBin: exportBin,
    modulesInfo: modulesInfo,
    toCliString: toCliString,
    toString: toString,
    stepToString: stepToString,
    toJSON: toJSON,
    stringToJSON: stringToJSON,
    stringToJSONstep: stringToJSONstep,
    importString: importString,
    importJSON: importJSON,
    loadNewModule: loadNewModule,
    saveNewModule: saveNewModule,
    createMetaModule: createMetaModule,
    saveSequence: saveSequence,
    loadModules: loadModules,
    
    //other functions
    log: log,
    objTypeOf: objTypeOf,
    copy: copy,

    setInputStep: require('./ui/SetInputStep')(sequencer)
  }

}
module.exports = ImageSequencer;
