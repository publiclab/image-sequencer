function $scope(scope) {
  return function(queryString){
    var element = $(scope.querySelector(queryString));

    element.elem = function(queryString){
      return new $scope(scope)(queryString);
    }
    element.elemAll = function(queryString){
      return new $scopeAll(scope)(queryString);
    }

    return element;
  }
}

function $scopeAll(scope){
  return function(queryString){
    var element = $(scope.querySelectorAll(queryString));

    element.elem = function(queryString){
      return new $scope(scope)(queryString);
    }
    element.elemAll = function(queryString){
      return new $scopeAll(scope)(queryString);
    }

    return element;
  }
}

function scopeSelector(scope){
  return $scope(scope);
}

function scopeSelectorAll(scope){
  return $scopeAll(scope);
}

module.exports = {
  scopeSelector,
  scopeSelectorAll
}