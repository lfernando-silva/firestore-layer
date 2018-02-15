function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var verify = require('../utils/Verifier');

var findById = require('./findById');

var find = require('./find');

var findByStrategy = function findByStrategy(id, params, options, ref) {
  return id ? findById({
    id: id
  }, options, ref) : find(params, options, ref);
};

module.exports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(params, options, ref) {
    var id, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            verify('upsert', params);
            id = params.id;
            delete params.id;

            if (!id) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return ref.doc(id).set(params, options);

          case 6:
            _context.t0 = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.next = 11;
            return ref.add(params, options);

          case 11:
            _context.t0 = _context.sent;

          case 12:
            result = _context.t0;
            return _context.abrupt("return", options && options.returning ? findByStrategy(result.id || id, params, options, ref) : result);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();