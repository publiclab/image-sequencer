module.exports = function(x, y, value, pixels){
  for(let i = 0; i < value.length; i++){
    pixels.set(x, y, i, value[i]);
  }
};