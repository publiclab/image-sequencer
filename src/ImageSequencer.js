if (typeof window !== 'undefined') { isBrowser = true; }
else { var isBrowser = false; }
require('./util/getStep.js');

ImageSequencer = function ImageSequencer(options) {

  var sequencer = (this.name == 'ImageSequencer') ? this : this.sequencer;
  options = options || {};
  options.inBrowser = options.inBrowser === undefined ? isBrowser : options.inBrowser;
  options.sequencerCounter = 0;

  function objTypeOf(object) {
    return Object.prototype.toString.call(object).split(' ')[1].slice(0, -1);
  }

  function log(color, msg) {
    if (options.ui != 'none') {
      if (arguments.length == 1) console.log(arguments[0]);
      else if (arguments.length == 2) console.log(color, msg);
    }
  }

  function copy(a) {
    if (!typeof (a) == 'object') return a;
    if (objTypeOf(a) == 'Array') return a.slice();
    if (objTypeOf(a) == 'Object') {
      var b = {};
      for (var v in a) {
        b[v] = copy(a[v]);
      }
      return b;
    }
    return a;
  }

  function makeArray(input) {
    return (objTypeOf(input) == 'Array') ? input : [input];
  }

  var image,
    steps = [],
    modules = require('./Modules'),
    sequences = require('./SavedSequences.json'),
    formatInput = require('./FormatInput'),
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
    var this_ = (this.name == 'ImageSequencer') ? this : this.sequencer;
    var args = [];
    var json_q = {};
    for (var arg in arguments) { args.push(copy(arguments[arg])); }
    json_q = formatInput.call(this_, args, '+');

    inputlog.push({ method: 'addSteps', json_q: copy(json_q) });
    for (var j in json_q)
      require('./AddStep')(this_, json_q[j].name, json_q[j].o);
    return this;
  }

  function removeStep(ref, index) {
    //remove the step from images[image].steps and redraw remaining images
    if (index > 0) {
      //var this_ = (this.name == "ImageSequencer") ? this : this.sequencer;
      thisStep = ref.steps[index];
      thisStep.UI.onRemove(thisStep.options.step);
      ref.steps.splice(index, 1);
    }
    //tell the UI a step has been removed
  }

  function removeSteps() {
    var   indices;
    var this_ = (this.name == 'ImageSequencer') ? this : this.sequencer;
    var args = [];
    for (var arg in arguments) args.push(copy(arguments[arg]));

    var json_q = formatInput.call(this_, args, '-');
    inputlog.push({ method: 'removeSteps', json_q: copy(json_q) });

    indices = json_q.sort(function(a, b) { return b - a; });
    for (var i in indices)
      removeStep(this_, indices[i]);
    return this;
  }

  function insertSteps() {
    var this_ = (this.name == 'ImageSequencer') ? this : this.sequencer;
    var args = [];
    for (var arg in arguments) args.push(arguments[arg]);

    var json_q = formatInput.call(this_, args, '^');
    inputlog.push({ method: 'insertSteps', json_q: copy(json_q) });

    var details = json_q;
    details = details.sort(function(a, b) { return b.index - a.index; });
    for (var i in details)
      require('./InsertStep')(this_, details[i].index, details[i].name, details[i].o);
    return this;
  }

  // Config is an object which contains the runtime configuration like progress bar
  // information and index from which the sequencer should run
  function run(config) {
    var progressObj, index = 0;
    config = config || { mode: 'no-arg' };
    if (config.index) index = config.index;

    if (config.mode != 'no-arg' && typeof config != 'function') {
      if (config.progressObj) progressObj = config.progressObj;
      delete arguments['0'];
    }

    var this_ = (this.name == 'ImageSequencer') ? this : this.sequencer;
    var args = [];
    for (var arg in arguments) args.push(copy(arguments[arg]));

    var callback = function() { };
    for (var arg in args)
      if (objTypeOf(args[arg]) == 'Function')
        callback = args.splice(arg, 1)[0]; //callback is formed

    var json_q = formatInput.call(this_, args, 'r');

    require('./Run')(this_, json_q, callback, index, progressObj);

    return true;
  }

  function loadImages() {
    var args = [];
    var prevSteps = this.getSteps().slice(1).map(step=>step.options.name);
    var sequencer = this;
    sequencer.image = arguments[0];
    for (var arg in arguments) args.push(copy(arguments[arg]));
    var json_q = formatInput.call(this, args, 'l');
    if(this.getSteps().length != 0){
      this.options.sequencerCounter = 0;
      inputlog = [];
      this.steps = [];
    }
    inputlog.push({ method: 'loadImages', json_q: copy(json_q) });
    var ret = {
      name: 'ImageSequencer Wrapper',
      sequencer: this,
      addSteps: this.addSteps,
      removeSteps: this.removeSteps,
      insertSteps: this.insertSteps,
      run: this.run,
      UI: this.UI,
      setUI: this.setUI
    };
    function loadPrevSteps(ref){
      if(prevSteps.length != 0){
        ref.addSteps(prevSteps);
        prevSteps = [];
      }
    }
    require('./ui/LoadImage')(sequencer, 'image', json_q.image, function() {
      loadPrevSteps(sequencer);
      json_q.callback.call(ret);
    });

  }

  function replaceImage(selector, steps, options) {
    options = options || {};
    options.callback = options.callback || function() { };
    return require('./ReplaceImage')(this, selector, steps, options);
  }

  //returns the steps added
  function getSteps(){
    return this.steps;
  }

  function setUI(UI) {
    this.events = require('./ui/UserInterface')(UI);
  }

  var exportBin = function(dir, basic, filename) {
    return require('./ExportBin')(dir, this, basic, filename);
  };

  function modulesInfo(name) {
    var modulesdata = {};
    if (name == 'load-image') return {};
    if (arguments.length == 0) {
      for (var modulename in this.modules) {
        modulesdata[modulename] = modules[modulename][1];
      }
      for (var sequencename in this.sequences) {
        modulesdata[sequencename] = { name: sequencename, steps: this.sequences[sequencename] };
      }
    }
    else {
      if (modules[name]){
        modulesdata = modules[name][1];
      }
      else
        modulesdata = { 'inputs': sequences[name]['options'] };
    }
    return modulesdata;
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
    mods = mods.substr(0, mods.length - 1) + '  \'' + name + '\': require(\'' + path + '\'),\n}';
    fs.writeFileSync('./src/Modules.js', mods);
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

  var str = require('./Strings.js')(this.steps, modulesInfo, addSteps, copy);

  return {
    //literals and objects
    name: 'ImageSequencer',
    options: options,
    inputlog: inputlog,
    modules: modules,
    sequences: sequences,
    events: events,
    steps: steps,
    image: image,

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
    toCliString: str.toCliString,
    detectStringSyntax: str.detectStringSyntax,
    parseStringSyntax: str.parseStringSyntax,
    stringToSteps: str.stringToSteps,
    toString: str.toString,
    stepToString: str.stepToString,
    toJSON: str.toJSON,
    stringToJSON: str.stringToJSON,
    stringToJSONstep: str.stringToJSONstep,
    importString: str.importString,
    importJSON: str.importJSON,
    loadNewModule: loadNewModule,
    saveNewModule: saveNewModule,
    createMetaModule: require('./util/createMetaModule'),
    saveSequence: saveSequence,
    loadModules: loadModules,
    getSteps:getSteps,

    //other functions
    log: log,
    objTypeOf: objTypeOf,
    copy: copy,

    setInputStep: require('./ui/SetInputStep')(sequencer)
  };

};
module.exports = ImageSequencer;
