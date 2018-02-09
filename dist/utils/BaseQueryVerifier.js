function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (fnName, params) {
  if (!fnName || typeof fnName !== 'string') {
    throw new Error("This operation requires the name of the function. See docs for details");
  }

  if (!params || _typeof(params) !== 'object') {
    throw new Error("This operation requires a params object for function ".concat(fnName, ". See docs for details"));
  }

  if (!params.collection) {
    throw new Error("This operation requires collection to query.");
  }
};