if (typeof window !== 'undefined') { isBrowser = true; }
else { var isBrowser = false; }
require('./util/getStep.js');

/**
 * @method ImageSequencer
 * @param {Object|Float32Array} options Optional options
 * @returns {Object}
 */
ImageSequencer = function ImageSequencer(options) {

  var str = require('./Strings.js')(this.steps, modulesInfo, addSteps, copy);

  var sequencer = (this.name == 'ImageSequencer') ? this : this.sequencer;
  options = options || {};
  options.inBrowser = options.inBrowser === undefined ? isBrowser : options.inBrowser;
  options.sequencerCounter = 0;
  function objTypeOf(object) {
    return Object.prototype.toString.call(object).split(' ')[1].slice(0, -1);
  }

  /**
   * @method log
   * @description Logs colored messages to the console using ASCII color codes
   * @param {String} color ASCII color code
   * @param {String} msg Message to be logged to the console
   */
  function log(color, msg) {
    if (options.ui != 'none') {
      if (arguments.length == 1) console.log(arguments[0]);
      else if (arguments.length == 2) console.log(color, msg);
    }
  }

  /**
   * @method copy
   * @description Returns a clone of the input object.
   * @param {Object|Float32Array} a The Object/Array to be cloned
   * @returns {Object|Float32Array}
   */
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
    sequences = JSON.parse(window.localStorage.getItem('sequences')); // Get saved sequences from localStorage
    if (!sequences) {
      sequences = {};
      window.localStorage.setItem('sequences', JSON.stringify(sequences)); // Set the localStorage entry as an empty Object by default
    }
  }

  // if in browser, prompt for an image
  // if (options.imageSelect || options.inBrowser) addStep('image-select');
  // else if (options.imageUrl) loadImage(imageUrl);

  /**
   * @method addSteps
   * @description Adds one of more steps to the sequence.
   * @return {Object}
   */
  function addSteps() {
    var this_ = (this.name == 'ImageSequencer') ? this : this.sequencer;
    var args = [];
    var json_q = {};
    for (var arg in arguments) { args.push(copy(arguments[arg])); } // Get all the module names from the arguments
    json_q = formatInput.call(this_, args, '+');

    inputlog.push({ method: 'addSteps', json_q: copy(json_q) });
    for (var j in json_q)
      require('./AddStep')(this_, json_q[j].name, json_q[j].o);
    return this;
  }

  /**
   * @method removeStep
   * @description Removes the step at the specified index from the sequence.
   * @param {Object} ref ImageSequencer instance
   * @param {Number} index Index of the step to be removed
   * @returns {Null}
   */
  function removeStep(ref, index) {
    // Remove the step from images[image].steps and redraw remaining images
    if (index > 0) {
      // var this_ = (this.name == "ImageSequencer") ? this : this.sequencer;
      thisStep = ref.steps[index];
      thisStep.UI.onRemove(thisStep.options.step);
      ref.steps.splice(index, 1);
    }
  }

  /**
   * @method removeSteps
   * @description Removes one or more steps from the sequence
   * @returns {Object}
   */
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

  /**
   * @method insertSteps
   * @description Inserts steps at the specified index
   * @returns {Object}
   */
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

  /**
   * @method run
   * @param {Object} config Object which contains the runtime configuration like progress bar information and index from which the sequencer should run.
   * @returns {Boolean}
   */
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
        callback = args.splice(arg, 1)[0]; // Callback is formed

    var json_q = formatInput.call(this_, args, 'r');

    require('./Run')(this_, json_q, callback, index, progressObj);

    return true;
  }

  /**
   * @method loadImages
   * @description Loads an image via dataURL or normal URL. Read the docs(https://github.com/publiclab/image-sequencer/blob/main/README.md) for more info.
   * @returns {Null}
   */
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

  /**
   * @method replaceImage
   * @description Replaces the current image in the sequencer
   * @param {String} selector DOM selector string for the image input
   * @param {*} steps Current steps Object
   * @param {Object} options
   * @returns {*}
   */
  function replaceImage(selector, steps, options) {
    options = options || {};
    options.callback = options.callback || function() { };
    return require('./ReplaceImage')(this, selector, steps, options);
  }

  /**
   * @method getSteps
   * @description Returns the current sequence of steps
   * @returns {Object}
   */
  function getSteps(){
    return this.steps;
  }

  /**
   * @method setUI
   * @description To set up a UI for ImageSequencer via different callback methods. Read the docs(https://github.com/publiclab/image-sequencer/blob/main/README.md) for more info.
   * @param {Object} UI Object containing UI callback methods. Read the docs(https://github.com/publiclab/image-sequencer/blob/main/README.md) for more info.
   * @returns {Null}
   */
  function setUI(UI) {
    this.events = require('./ui/UserInterface')(UI);
  }

  var exportBin = function(dir, basic, filename) {
    return require('./ExportBin')(dir, this, basic, filename);
  };

  /**
   * @method modulesInfo
   * @description Returns information about the given module or all the available modules
   * @param {String} name Module name
   * @returns {Object}
   */
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

  /**
   * @method loadNewModule
   * @description Adds a new local module to sequencer. Read the docs(https://github.com/publiclab/image-sequencer/blob/main/README.md) for mode info.
   * @param {String} name Name of the new module
   * @param {Object} options An Object containing path and info about the new module.
   * @returns {Object}
   */
  function loadNewModule(name, options) {

    if (!options) {
      return this;

    } else if (Array.isArray(options)) {
      // Contains the array of module and info
      this.modules[name] = options;

    } else if (options.func && options.info) {
      // Passed in options object
      this.modules[name] = [
        options.func, options.info
      ];

    } else if (options.path && !this.inBrowser) {
      // Load from path(only in node)
      const module = [
        require(`${options.path}/Module.js`),
        require(`${options.path}/info.json`)
      ];
      this.modules[name] = module;
    }
    return this;
  }

  /**
   * @method saveNewModule
   * @description Saves a new local module to ImageSequencer
   * @param {String} name Name of the new module
   * @param {String} path Path to the new module
   * @returns {Null}
   */
  function saveNewModule(name, path) {
    if (options.inBrowser) {
      // Not for browser context
      return;
    }
    var mods = fs.readFileSync('./src/Modules.js').toString();
    mods = mods.substr(0, mods.length - 1) + '  \'' + name + '\': require(\'' + path + '\'),\n}';
    fs.writeFileSync('./src/Modules.js', mods);
  }

  /**
   * @method saveSequence
   * @description Saves a sequence on the browser localStorage.
   * @param {String} name Name for the sequence
   * @param {String} sequenceString Sequence data as a string
   * @returns {Null}
   */
  function saveSequence(name, sequenceString) { // 4. save sequence
    const sequence = str.stringToJSON(sequenceString);
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
    // loadModules function loads the modules and saved sequences.
    this.modules = require('./Modules');
    if (options.inBrowser)
      this.sequences = JSON.parse(window.localStorage.getItem('sequences'));
    else
      this.sequences = require('./SavedSequences.json');
  }


  return {
    // Literals and objects
    name: 'ImageSequencer',
    options: options,
    inputlog: inputlog,
    modules: modules,
    sequences: sequences,
    events: events,
    steps: steps,
    image: image,

    // User functions
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

    // Other functions
    log: log,
    objTypeOf: objTypeOf,
    copy: copy,
    getImageDimensions: require('./util/getImageDimensions'),

    setInputStep: require('./ui/SetInputStep')(sequencer)
  };

};
module.exports = ImageSequencer;
