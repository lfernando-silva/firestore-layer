function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var verify = require('../utils/Verifier');

var FormatResult = require('../utils/FormatResult');

var FormatRawResult = require('../utils/FormatRawResult');

var Checker = require('../utils/Checker');

var getAggregations = {
  'where': function where(ref, _where) {
    return ref.where(_where.field, _where.matchCriteria, _where.matchValue);
  },
  'orderBy': function orderBy(ref, order) {
    return ref.orderBy(order.field, order.order || 'asc');
  }
};

var processQuery = function processQuery(params, ref, aggregationType) {
  if (!Checker.isArray(params)) {
    params = [params];
  } //Remember, every doc field must to be indexed at firestore!


  var list = !Checker.isArray(params) ? [params] : params;
  var localRef = ref;
  list.forEach(function (element) {
    localRef = getAggregations[aggregationType](localRef, element);
  });
  return localRef;
};

module.exports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(params, options, ref) {
    var localRef, result, docs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            verify('find', params.criteria);
            localRef = options.all ? ref : processQuery(params.criteria, ref, 'where');
            localRef = options.orderBy && processQuery(options.orderBy, localRef, 'orderBy') || localRef;
            localRef = options.limit && localRef.limit(options.limit) || localRef;
            _context.next = 7;
            return localRef.get();

          case 7:
            result = _context.sent;
            docs = result._docs();
            return _context.abrupt("return", !Array.isArray(docs) || !docs.length ? [] : !result || options && options.rawData ? FormatRawResult(docs) : docs.map(function (doc) {
              return FormatResult(doc);
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();