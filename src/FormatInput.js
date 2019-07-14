/*
The file as the name suggests is used to format input as recieved from user
and provide a more informative and documented one. Here is a example list of few
expansions to the below used short-forms:

o_string: optional string

string_a: an array of strings

o_string_a: an optional array of strings

and similarly for others.

For various format inputs, the meaning they convey are:

'+' : add a step
'-' : remove a step
'^' : insert a step (in between)
'r' : run a step
'l' : load image

*/




// checks the type of object, such as array etc using object prototype
function objTypeOf(object){
  return Object.prototype.toString.call(object).split(' ')[1].slice(0, -1);
}

function getPrimitive(object){
  return (objTypeOf(object) == 'Array') ? object[0] : object;
}

//used to convert the input into an array
function makeArray(input) {
  return (objTypeOf(input) == 'Array') ? input : [input];
}

//makes an exact copy so that the original value is not referenced
function copy(a) {
  if (!typeof(a) == 'object') return a;
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

function formatInput(args, format, images) {
  var json_q = {};
  var format_i = format;
  // Format the input as per the arguments allowed in function signature
  if (format == '+')
    format = ['string_a', 'o_object'];
  else if (format == '-')
    format = ['number_a'];
  else if (format == '^')
    format = ['number', 'string', 'o_object'];
  else if (format == 'r')
    format = ['o_number'];
  else if (format == 'l')
    format = ['o_string', 'string', 'o_function'];

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

  // creating an empty object if no object is provided in the inputs by user
  if(format[format.length - 1] == 'o_object') {
    if(objTypeOf(args[args.length - 1]) != 'Object')
      args.push({});
  }
  // creating a dummy number 1 for an optional number if not provided
  else if (format[format.length - 1] == 'o_number') {
    if(typeof(args[args.length - 1]) != 'number' && objTypeOf(args[0]) != 'Object')
      args.push(1);
  }

  // creating an empty function if no function is provided in the inputs by user
  else if (format[format.length - 1] == 'o_function') {
    if(objTypeOf(args[args.length - 1]) != 'Function' && objTypeOf(args[0]) != 'Object')
      args.push(function(){});
  }


  if(args.length == format.length) {//making of arrays
    for (var i in format) {
      if (format[i].substr(format[i].length - 2, 2) == '_a')
        args[i] = makeArray(args[i]);
    }
  }

  if (args.length == 1 ) {
    if(format_i == 'r') json_q = {0:copy(args[0])};
    else if(format_i == '-') {
      json_q = [];
      json_q = copy(args[0]);
    }
  }
  else if (format_i == 'r' ) {
    for (var img in args[0]) json_q = {0:args[0]};
  }
  else if (format_i == 'l') {
    json_q = {
      image: args[0],
      callback: args[1]
    };
  }
  else {
    json_q = [];
    if(format_i == '+') {
      for(var s in args[0]) {
        json_q.push({
          name: args[0][s],
          o: args[1]
        });
      }
    }


    if(format_i == '^') {
      var size = this.steps.length;
      var index = args[0];
      index = (index == size) ? index : index % size;
      if (index < 0) index += size + 1;
      json_q.push({
        index: index,
        name: args[1],
        o: args[2]
      });

    }
  }

  return json_q;

}
module.exports = formatInput;
