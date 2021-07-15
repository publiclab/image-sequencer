module.exports = function(ref, source, dest) {

  if(source > ref.steps.length - 1 || dest > ref.steps.length - 1 ) return false;

  var stepName = ref.steps[source].options.name;
  ref.removeSteps(source);
  ref.insertSteps(dest, stepName);
  ref.run();
  
  return true;
};
