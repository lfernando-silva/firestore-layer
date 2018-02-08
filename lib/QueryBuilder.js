const Database = require('./Database')

module.exports = class QueryBuilder {
    constructor(serviceAccountKeyPath){
        this.serviceAccountKey = serviceAccountKeyPath
        this.database = Database(this.serviceAccountKey)
    }

    async findById(params, options){
        const {collection, id} = params
        try{
            const result = await this.database.collection(collection).doc(id).get()
            return options && options.rawData ? result : result._fieldsProto
        } catch(err) {
            throw err
        }
    }
}
