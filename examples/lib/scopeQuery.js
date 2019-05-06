/**
 * @method $scope
 * @param {"DOMNode"|"JQuery"} scope DOM Node or JQuery class as the scope 
 */
function $scope(scope) {
  return function(queryString){
    var element = $(scope).find(queryString);

    element.elem = function(queryString){
      return new $scope(scope)(queryString);
    }
    element.elemAll = function(queryString){
      return new $scopeAll(scope)(queryString);
    }

    return element;
  }
}

/**
 * @method $scopeAll
 * @param {"DOMNode"|"JQuery"} scope DOM Node or JQuery class as the scope 
 */
function $scopeAll(scope){
  return function(queryString){
    var element = $(scope).find(queryString);

    element.elem = function(queryString){
      return new $scope(scope)(queryString);
    }
    element.elemAll = function(queryString){
      return new $scopeAll(scope)(queryString);
    }

    return element;
  }
}

/**
 * @method scopeSelector
 * @description A scoped jQuery selector
 * @param {"DOMNode"|"JQuery"} scope DOM Node or JQuery class as the scope 
 */
function scopeSelector(scope){
  return $scope(scope);
}

/**
 * @method scopeSelectorAll
 * @description A scoped jQuery multiple selector
 * @param {"DOMNode"|"JQuery"} scope DOM Node or JQuery class as the scope 
 */
function scopeSelectorAll(scope){
  return $scopeAll(scope);
}

module.exports = {
  scopeSelector,
  scopeSelectorAll
}