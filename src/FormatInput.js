function objTypeOf(object){
  return Object.prototype.toString.call(object).split(' ')[1].slice(0,-1);
}

function getPrimitive(object){
  return (objTypeOf(object)=='Array')?object[0]:object;
}

function makeArray(input) {
  return (objTypeOf(input)=='Array')?input:[input];
}

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

function formatInput(args,format,images) {
  var json_q = {};
  var format_i = format;
  if (format == '+')
    format = ['string_a', 'o_object'];
  else if (format == '-')
    format = ['number_a'];
  else if (format == '^')
    format = ['number', 'string', 'o_object'];
  else if (format == 'r')
    format = ['o_number'];
  else if (format == 'l')
    format = ['string','o_function'];
    

  if(format[format.length-1] == 'o_object') {
    if(objTypeOf(args[args.length-1]) != 'Object')
      args.push({});
  }
  else if (format[format.length-1] == 'o_number') {
    if(typeof(args[args.length-1]) != 'number' && objTypeOf(args[0])!='Object')
      args.push(1);
  }
  else if (format[format.length-1] == 'o_function') {
    if(objTypeOf(args[args.length-1]) != 'Function' && objTypeOf(args[0])!='Object')
      args.push(function(){});
  }


  if(args.length == format.length) {//making of arrays
    for (var i in format) {
      if (format[i].substr(format[i].length-2,2)=='_a')
        args[i] = makeArray(args[i]);
    }
  }

  if (args.length == 1 ) {
    if(format_i == 'r') json_q = {0:copy(args[0])};
    else if(format_i == '-') {
      json_q=[];
      json_q= copy(args[0]);
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
      index = (index==size)?index:index%size;
      if (index<0) index += size+1;
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
