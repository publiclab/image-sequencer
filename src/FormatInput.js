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
module.exports = formatInput;
