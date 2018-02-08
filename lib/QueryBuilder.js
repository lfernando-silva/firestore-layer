const Database = require('./Database')
const verify = require('../utils/Verifier')

module.exports = class QueryBuilder {
    constructor(serviceAccountKeyPath){
        this.serviceAccountKey = serviceAccountKeyPath
        this.database = Database(this.serviceAccountKey)
    }

    getCollection(collection){
        return this.database.collection(collection)
    }

    async query(fnName, params, options){
        try {
            verify(fnName, params)
            return await this[fnName](params,options)
        } catch(err) {
            throw err
        }
    }

    async findById(params, options){
            const {collection, id} = params
            const result = await this.getCollection(collection).doc(id).get()
            return options && options.rawData ? result : result.data()
    }

    async find(params, options){
        try {
            const {collection, where} = params
            const result = await this.getCollection(collection).where().get()
        } catch (err) {
            throw err
        }
    }
}
