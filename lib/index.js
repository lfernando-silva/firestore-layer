const QueryBuilder = require('./QueryBuilder')
module.exports = (serviceAccountKeyPath) => new QueryBuilder(serviceAccountKeyPath)
