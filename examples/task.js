function Run(ref, json_q, callback, ind, progressObj) {
  if (!progressObj) progressObj = { stop: function() { } };

  function drawStep(drawarray, pos) {
    if (pos == drawarray.length && drawarray[pos - 1] !== undefined) {
      var image = drawarray[pos - 1].image;
      if (ref.objTypeOf(callback) == "Function" && ref.images[image].steps.slice(-1)[0].output) {
        var steps = ref.images[image].steps;
        var out = steps[steps.length - 1].output.src;
        callback(out);
        return true;
      }
    }

    // so we don't run on the loadImage module:
    if (drawarray[pos] !== undefined) {
      var image = drawarray[pos].image;
      var i = drawarray[pos].i;
      var input = ref.images[image].steps[i - 1].output;

      ref.images[image].steps[i].getStep = function getStep(offset) {
        if (i + offset >= ref.images[image].steps.length) return { options: { name: undefined } };
        else return ref.images[image].steps.slice(i + offset)[0];
      };
      ref.images[image].steps[i].getIndex = function getIndex() {
        return i;
      }

      for (var util in getStepUtils) {
        if (getStepUtils.hasOwnProperty(util)) {
          ref.images[image].steps[i][util] = getStepUtils[util];
        }
      }

      // Tell UI that a step is being drawn.
      ref.images[image].steps[i].UI.onDraw(ref.images[image].steps[i].options.step);

      // provides a set of standard tools for each step
      var inputForNextStep = require('./RunToolkit')(ref.copy(input));

      ref.images[image].steps[i].draw(
        inputForNextStep,
        function onEachStep() {

          // This output is accessible by UI
          ref.images[image].steps[i].options.step.output = ref.images[image].steps[i].output.src;

          // Tell UI that step has been drawn.
          ref.images[image].steps[i].UI.onComplete(ref.images[image].steps[i].options.step);

          drawStep(drawarray, ++pos);
        },
        progressObj
      );
    }
  }

  function drawSteps(json_q) {
    var drawarray = [];
    for (var image in json_q) {
      var no_steps = ref.images[image].steps.length;
      var init = json_q[image];
      for (var i = 0; i < no_steps - init; i++) {
        drawarray.push({ image: image, i: init + i });
      }
    }
    drawStep(drawarray, ind);
  }

  function filter(json_q) {
    for (var image in json_q) {
      if (json_q[image] == 0 && ref.images[image].steps.length == 1)
        delete json_q[image];
      else if (json_q[image] == 0) json_q[image]++;
    }
    for (var image in json_q) {
      var prevstep = ref.images[image].steps[json_q[image] - 1];
      while (
        typeof prevstep == "undefined" ||
        typeof prevstep.output == "undefined"
      ) {
        prevstep = ref.images[image].steps[--json_q[image] - 1];
      }
    }
    return json_q;
  }

  var json_q = filter(json_q);
  return drawSteps(json_q);
}


function objTypeOf(object){
  return Object.prototype.toString.call(object).split(" ")[1].slice(0,-1)
}

function getPrimitive(object){
  return (objTypeOf(object)=='Array')?object[0]:object;
}

function makeArray(input) {
  return (objTypeOf(input)=="Array")?input:[input];
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

function formatInput(args,format,images) {
  images = [];
  for (var image in this.images) {
    images.push(image);
  }
  var json_q = {};
  var format_i = format;
  if (format == "+")
    format = ['o_string_a', 'string_a', 'o_object'];
  else if (format == "-")
    format = ['o_string_a', 'number_a'];
  else if (format == "^")
    format = ['o_string_a', 'number', 'string', 'o_object'];
  else if (format == "r")
    format = ['o_string_a', 'o_number'];
  else if (format == "l")
    format = ['o_string','string','o_function'];

  /*
    formats:
      addSteps :: o_image_a, name_a, o_o
        o_string_a, string_a, o_object => { image: [{name,o}] }
      removeSteps :: o_image_a, index_a
        o_string_a, number_a => { image: [index] }
      insertSteps :: o_image_a, index, name, o_o
        o_string_a, number, string, o_object => { image: [{index,name,o}] }
      run :: o_image_a, o_from
        o_string_a, o_number => { image: index }
      loadImages :: image, src, o_function
        string, string, o_function => { images: [{image:src}], callback }

    optionals:
      image: o_string_a
      options: o_object
      from: o_number
      callback: o_function
  */

  if(format[format.length-1] == "o_object") {
    if(objTypeOf(args[args.length-1]) != "Object")
      args.push({});
  }
  else if (format[format.length-1] == "o_number") {
    if(typeof(args[args.length-1]) != "number" && objTypeOf(args[0])!="Object")
      args.push(1);
  }
  else if (format[format.length-1] == "o_function") {
    if(objTypeOf(args[args.length-1]) != "Function" && objTypeOf(args[0])!="Object")
      args.push(function(){});
  }

  if(format[0] == "o_string_a") {
    if(args.length == format.length - 1) {
      var insert = false;
      for (var i in args) {
        if (format[parseInt(i)+1].includes( typeof(getPrimitive(args[i])) )){
          insert = true;
        }
        else {insert = false; break;}
      }
      if(insert)
        args.splice(0,0,copy(images));
    }
  }
  else if (format[0] == "o_string" && format_i == "l" && args.length == 2) {
    if (typeof(args[0]) == "string") {
      var identifier = "image";
      var number = 1;
      while (this.images.hasOwnProperty(identifier+number)) number++;
      args.splice(0,0,identifier+number);
    }
  }

  if(args.length == format.length) {
    for (var i in format) {
      if (format[i].substr(format[i].length-2,2)=="_a")
        args[i] = makeArray(args[i]);
    }
  }

  if (args.length == 1) {
    json_q = copy(args[0]);
    if(!(format_i == "r" || format_i == "l")) {
      for (var img in json_q)
        json_q[img] = makeArray(json_q[img]);
    }
  }
  else if (format_i == "r") {
    for (var img in args[0]) json_q[args[0][img]] = args[1];
  }
  else if (format_i == "l") {
    json_q = {
      images: {},
      callback: args[2]
    }
    json_q.images[args[0]] = args[1];
  }
  else {
    for (var img in args[0]) {
      var image = args[0][img];
      json_q[image] = [];

      if(format_i == "+") {
        for(var s in args[1]) {
          json_q[image].push({
            name: args[1][s],
            o: args[2]
          });
        }
      }

      if(format_i == "-") {
        json_q[image] = args[1];
      }

      if(format_i == "^") {
        var size = this.images[image].steps.length;
        var index = args[1];
        index = (index==size)?index:index%size;
        if (index<0) index += size+1;
        json_q[image].push({
          index: index,
          name: args[2],
          o: args[3]
        });
      }

    }
  }

  if(format_i == "l") {
    json_q.loadedimages = [];
    for (var i in json_q.images) json_q.loadedimages.push(i);
  }

  return json_q;

}


function run(config, sequencer) {
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

    var this_ = (sequencer.name == "ImageSequencer") ? sequencer : sequencer.sequencer;
    var args = (sequencer.name == "ImageSequencer") ? [] : [sequencer.images];
    for (var arg in arguments) args.push(copy(arguments[arg]));

    var callback = function() { };
    for (var arg in args)
      if (objTypeOf(args[arg]) == "Function")
        callback = args.splice(arg, 1)[0];

    var json_q = formatInput.call(this_, args, "r");

    Run(this_, json_q, callback, index, progressObj);

    return true;
  }

self.addEventListener('message', function(e) {
  // _sequencer.run({ index: _sequencer.images.image1.steps.length - sequenceLength - 1 });
  console.log(e);
  console.log("data",e.data,"type :",typeof(e.data));
  console.log("before :",e.data._sequencer);
  run({ index: e.data.images.image1.steps.length - e.data.sequenceLength - 1 }, e.data._sequencer);
  console.log("after :",e.data._sequencer);
  self.postMessage(e.data._sequencer);
}, false);

