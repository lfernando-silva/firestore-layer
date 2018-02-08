const Database = require('./Database')
const verify = require('../utils/Verifier')

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
            return await this[fnName](params, options)
        } catch (err) {
            throw err
        }
    }

    async findById(params, options) {
        const {collection, id} = params
        const result = await this.getCollection(collection).doc(id).get()
        return !result || options && options.rawData ? result : result.data()
    }

    async find(params, options) {
        try {
            const {collection, field, matchCriteria, matchValue} = params
            const result = await this.getCollection(collection).where(field, matchCriteria, matchValue).get()
            return !result || options && options.rawData ? result._docs() : result._docs().map(doc => doc.data())
        } catch (err) {
            throw err
        }
    }
}
