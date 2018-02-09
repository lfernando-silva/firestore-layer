var QueryBuilder = require('./QueryBuilder');

module.exports = function (serviceAccountKeyPath) {
  return new QueryBuilder(serviceAccountKeyPath);
};