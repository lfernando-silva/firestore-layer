const verify = require('../../utils/Verifier')
const FormatResult = require('../../utils/FormatResult')
const FormatRawResult = require('../../utils/FormatRawResult')
const Checker = require('../../utils/Checker')

const getAggregations = {
    'where': (ref, where) => (ref).where(where.field, where.matchCriteria, where.matchValue),
    'orderBy': (ref, order) => (ref).orderBy(order.field,order.order || 'asc')
}

const processQuery = (params, ref, aggregationType) => {
    if(!Checker.isArray(params)){
        params = [params]
    }

    //Remember, every doc field must to be indexed at firestore!
    const list = (!Checker.isArray(params) ? [params] : params)
    let localRef = ref

    list.forEach(element => {
        localRef = getAggregations[aggregationType](localRef, element)
    })
    return localRef
}

module.exports = async (params, options, ref) => {
    try {
        verify('find', params.criteria)
        let localRef = options.all ? ref: processQuery(params.criteria, ref, 'where')
        localRef = options.orderBy && processQuery(options.orderBy, localRef, 'orderBy') || localRef
        localRef = options.limit && localRef.limit(options.limit) || localRef

        const result = await localRef.get()
        const docs = result._docs()
        return !Array.isArray(docs) || !docs.length
            ? []
            : !result || options && options.rawData
                ? FormatRawResult(docs)
                : docs.map(doc => FormatResult(doc))
    } catch (err) {
        throw err
    }
}
