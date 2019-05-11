module.exports = function(info){
  var defaults = {};
  for (var key in info.inputs) {
    if (info.inputs.hasOwnProperty(key)) {
      defaults[key] = info.inputs[key].default;
    }
  }
  return defaults;
};
