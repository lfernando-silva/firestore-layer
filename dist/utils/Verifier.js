var Checker = require('./Checker');

var obtainRequiredFields = function obtainRequiredFields(fnName) {
  var fnRequiredFields = {
    'findById': 'id',
    'find': 'field,matchCriteria,matchValue',
    'upsert': 'none',
    'remove': 'id'
  };
  return fnRequiredFields[fnName];
};

module.exports = function (fnName, params, options) {
  var commaRegex = /,/g;
  var requiredFnNameFields = obtainRequiredFields(fnName);

  if (requiredFnNameFields === 'none') {
    return true;
  }

  var isArray = Checker.isArray(params);
  var isEmpty = Checker.isEmpty(params);

  if (isArray && isEmpty) {
    throw new Error('An empty criteria array is invalid');
  }

  var paramsHasSpecificRequiredFields = requiredFnNameFields && isArray ? params.filter(function (param) {
    return Checker.paramsHasFields(param, requiredFnNameFields.split(commaRegex));
  }).length === params.length : Checker.paramsHasFields(params, requiredFnNameFields.split(commaRegex));

  if (!paramsHasSpecificRequiredFields && options && !options.all) {
    throw new Error("This operation requires the following fields ".concat(isArray && 'for all criterias', ": ").concat(requiredFnNameFields, "."));
  }
};