function $step(scope) {
  return function(queryString){
    var element = $(scope.querySelector(queryString));

    element.step = function(queryString){
      return new $step(scope)(queryString);
    }
    element.stepAll = function(queryString){
      return new $stepAll(scope)(queryString);
    }

    return element;
  }
}

function $stepAll(scope){
  return function(queryString){
    var element = $(scope.querySelectorAll(queryString));

    element.step = function(queryString){
      return new $step(scope)(queryString);
    }
    element.stepAll = function(queryString){
      return new $stepAll(scope)(queryString);
    }

    return element;
  }
}

function stepSelector(scope){
  return $step(scope);
}

function stepSelectorAll(scope){
  return $stepAll(scope);
}

module.exports = {
  stepSelector: stepSelector,
  stepSelectorAll: stepSelectorAll
}