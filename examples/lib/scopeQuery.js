/**
 * @method $scope
 * @param {"DOMNode"} scope A DOM Node as the scope
 * @returns {Function} Constructor for the scopeSelector Object.
 */
function $scope(scope) {
  return function(queryString){
    var element = $(scope.querySelector(queryString));

    element.elem = function(queryString){
      return new $scope(scope)(queryString);
    };
    element.elemAll = function(queryString){
      return new $scopeAll(scope)(queryString);
    };
    element.getDomElem = function(i = 0){
      return element[i];
    };
    element.getScope = () => scope;

    return element;
  };
}

/**
 * @method $scopeAll
 * @param {"DOMNode"} scope A DOM Node as the scope
 * @returns {Function} Constructor for the scopeSelectorAll Object.
 */
function $scopeAll(scope){
  return function(queryString){
    var element = $(scope.querySelectorAll(queryString));

    element.elem = function(queryString){
      return new $scope(scope)(queryString);
    };
    element.elemAll = function(queryString){
      return new $scopeAll(scope)(queryString);
    };
    element.getDomElem = function(i = 0){
      return element[i];
    };
    element.getScope = () => scope;

    return element;
  };
}

/**
 * @method scopeSelector
 * @description A scoped jQuery selector
 * @param {"DOMNode"} scope A DOM Node as the scope
 * @returns {Function}
 */
function scopeSelector(scope){
  return $scope(scope);
}

/**
 * @method scopeSelectorAll
 * @description A scoped jQuery multiple selector
 * @param {"DOMNode} scope A DOM Node as the scope
 * @returns {Function}
 */
function scopeSelectorAll(scope){
  return $scopeAll(scope);
}

module.exports = {
  scopeSelector,
  scopeSelectorAll
};