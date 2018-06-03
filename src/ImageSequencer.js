if (typeof window !== 'undefined') {isBrowser = true}
else {var isBrowser = false}
require('./util/getStep.js')

ImageSequencer = function ImageSequencer(options) {

  var sequencer = (this.name == "ImageSequencer")?this:this.sequencer;
  options = options || {};
  options.inBrowser = options.inBrowser || isBrowser;
  options.sequencerCounter = 0;

  function objTypeOf(object){
    return Object.prototype.toString.call(object).split(" ")[1].slice(0,-1)
  }

  function log(color,msg) {
    if(options.ui!="none") {
      if(arguments.length==1) console.log(arguments[0]);
      else if(arguments.length==2) console.log(color,msg);
    }
  }

  function copy(a) {
    if (!typeof(a) == "object") return a;
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
    return (objTypeOf(input)=="Array")?input:[input];
  }

  var image,
  steps = [],
  modules = require('./Modules'),
  formatInput = require('./FormatInput'),
  images = {},
  inputlog = [],
  events = require('./ui/UserInterface')(),
  fs = require('fs');

  // if in browser, prompt for an image
  // if (options.imageSelect || options.inBrowser) addStep('image-select');
  // else if (options.imageUrl) loadImage(imageUrl);

  function addSteps(){
    var this_ = (this.name == "ImageSequencer")?this:this.sequencer;
    var args = (this.name == "ImageSequencer")?[]:[this.images];
    var json_q = {};
    for(var arg in arguments){args.push(copy(arguments[arg]));}
    json_q = formatInput.call(this_,args,"+");

    inputlog.push({method:"addSteps", json_q:copy(json_q)});

    for (var i in json_q)
    for (var j in json_q[i])
    require("./AddStep")(this_,i,json_q[i][j].name,json_q[i][j].o);

    return this;
  }

  function removeStep(image,index) {
    //remove the step from images[image].steps and redraw remaining images
    if(index>0) {
      thisStep = images[image].steps[index];
      thisStep.UI.onRemove(thisStep.options.step);
      images[image].steps.splice(index,1);
    }
    //tell the UI a step has been removed
  }

  function removeSteps(image,index) {
    var run = {}, indices;
    var this_ = (this.name == "ImageSequencer")?this:this.sequencer;
    var args = (this.name == "ImageSequencer")?[]:[this.images];
    for(var arg in arguments) args.push(copy(arguments[arg]));

    var json_q = formatInput.call(this_,args,"-");
    inputlog.push({method:"removeSteps", json_q:copy(json_q)});

    for (var img in json_q) {
      indices = json_q[img].sort(function(a,b){return b-a});
      run[img] = indices[indices.length-1];
      for (var i in indices)
      removeStep(img,indices[i]);
    }
    // this.run(run); // This is creating problems
    return this;
  }

  function insertSteps(image, index, name, o) {
    var run = {};
    var this_ = (this.name == "ImageSequencer")?this:this.sequencer;
    var args = (this.name == "ImageSequencer")?[]:[this.images];
    for (var arg in arguments) args.push(arguments[arg]);

    var json_q = formatInput.call(this_,args,"^");
    inputlog.push({method:"insertSteps", json_q:copy(json_q)});

    for (var img in json_q) {
      var details = json_q[img];
      details = details.sort(function(a,b){return b.index-a.index});
      for (var i in details)
      require("./InsertStep")(this_,img,details[i].index,details[i].name,details[i].o);
      run[img] = details[details.length-1].index;
    }
    // this.run(run); // This is Creating issues
    return this;
  }

  function run(spinnerObj,t_image,t_from) {
    let progressObj;
    if(arguments[0] != 'test'){
      progressObj = spinnerObj
      delete arguments['0']
    }

    var this_ = (this.name == "ImageSequencer")?this:this.sequencer;
    var args = (this.name == "ImageSequencer")?[]:[this.images];
    for (var arg in arguments) args.push(copy(arguments[arg]));

    var callback = function() {};
    for (var arg in args)
    if(objTypeOf(args[arg]) == "Function")
    callback = args.splice(arg,1)[0];

    var json_q = formatInput.call(this_,args,"r");

    require('./Run')(this_, json_q, callback,progressObj);

    return true;
  }

  function loadImages() {
    var args = [];
    var sequencer = this;
    for (var arg in arguments) args.push(copy(arguments[arg]));
    var json_q = formatInput.call(this,args,"l");

    inputlog.push({method:"loadImages", json_q:copy(json_q)});
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
      if(i==loadedimages.length) {
        json_q.callback.call(ret);
        return;
      }
      var img = loadedimages[i];
      require('./ui/LoadImage')(sequencer,img,json_q.images[img],function(){
        load(++i);
      });
    }

    load(0);
  }

  function replaceImage(selector,steps,options) {
    options = options || {};
    options.callback = options.callback || function() {};
    return require('./ReplaceImage')(this,selector,steps,options);
  }

  function setUI(UI) {
    this.events = require('./ui/UserInterface')(UI);
  }

  var exportBin = function(dir,basic) {
    return require('./ExportBin')(dir,this,basic);
  }

  function modulesInfo(name) {
    var modulesdata = {}
    if(name == "load-image") return {};
    if(arguments.length==0)
    for (var modulename in modules) {
      modulesdata[modulename] = modules[modulename][1];
    }
    else modulesdata = modules[name][1];
    return modulesdata;
  }

  // Strigifies the current sequence
  function toString(step) {
    if(step) {
      return stepToString(step);
    } else {
      return copy(this.images.image1.steps).map(stepToString).slice(1).join(',');
    }
  }

  // Stringifies one step of the sequence
  function stepToString(step) {
    let inputs = copy(modulesInfo(step.options.name).inputs);
    inputs = inputs || {};

    for(let input in inputs) {
      inputs[input] = step.options[input] || inputs[input].default;
      inputs[input] = encodeURIComponent(inputs[input]);
    }

    var configurations = Object.keys(inputs).map(key=>key + ':' + inputs[key]).join(',');
    return `${step.options.name}(${configurations})`;
  }

  // Coverts stringified sequence into JSON
  function importStringtoJson(str){
    let steps = str.split(',');
    return steps.map(importStringtoJsonStep);
  }
  // Converts one stringified step into JSON
  function importStringtoJsonStep(str){
    if(str.indexOf('(') === -1) {
      str = [
        str.substr(0),
        ""
      ]
    } else {
      str = [
      str.substr(0,str.indexOf('(')),
      str.slice(str.indexOf('(')+1,-1)
    ];
    }

    str[1] = str[1].split(',').reduce(function(acc,cur,i){
      cur = [
        cur.substr(0,cur.indexOf(':')),
        decodeURIComponent(cur.substr(cur.indexOf(':') + 1))
      ];
      if(!!cur[0]) acc[cur[0]] = cur[1];
      return acc;
    },{});

    return {
      name : str[0],
      options:str[1]
    }
  }

  return {
    //literals and objects
    name: "ImageSequencer",
    options: options,
    inputlog: inputlog,
    modules: modules,
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
    toString: toString,
    stepToString: stepToString,
    importStringtoJson: importStringtoJson,
    importStringtoJsonStep: importStringtoJsonStep,

    //other functions
    log: log,
    objTypeOf: objTypeOf,
    copy: copy,

    setInputStep: require('./ui/SetInputStep')(sequencer)
  }

}
module.exports = ImageSequencer;
