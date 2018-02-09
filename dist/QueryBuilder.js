function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Database = require('./Database');

var verify = require('../utils/BaseQueryVerifier');

var DatabaseActions = require('./actions');

module.exports =
/*#__PURE__*/
function () {
  function QueryBuilder(serviceAccountKeyPath) {
    _classCallCheck(this, QueryBuilder);

    this.serviceAccountKey = serviceAccountKeyPath;
    this.database = Database(this.serviceAccountKey);
  }

  _createClass(QueryBuilder, [{
    key: "getCollection",
    value: function getCollection(collection) {
      return this.database.collection(collection);
    }
  }, {
    key: "query",
    value: function () {
      var _query = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(fnName, params, options) {
        var collection;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                verify(fnName, params);
                collection = params.collection;
                delete params.collection;
                _context.next = 6;
                return DatabaseActions[fnName](params, options, this.getCollection(collection), fnName);

              case 6:
                return _context.abrupt("return", _context.sent);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      return function query(_x, _x2, _x3) {
        return _query.apply(this, arguments);
      };
    }()
  }]);

  return QueryBuilder;
}();