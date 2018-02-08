const Database = require('./Database')
const verify = require('../utils/Verifier')
const DatabaseActions = require('./actions')

module.exports = class QueryBuilder {
    constructor(serviceAccountKeyPath) {
        this.serviceAccountKey = serviceAccountKeyPath
        this.database = Database(this.serviceAccountKey)
    }

    getCollection(collection) {
        return this.database.collection(collection)
    }

    async query(fnName, params, options) {
        try {
            verify(fnName, params)
            return await DatabaseActions[fnName](params, options, this.getCollection(params.collection))
        } catch (err) {
            throw err
        }
    }
}
