const verify = require('../../utils/Verifier')
const FormatResult = require('../../utils/FormatResult')
const FormatRawResult = require('../../utils/FormatRawResult')
const Checker = require('../../utils/Checker')

const processWheres = (params, ref) => {
    if(!Checker.isArray(params)){
        params = [params]
    }

    //Remember, every doc field must to be indexed at firestore!
    const whereList = (!Checker.isArray(params) ? [params] : params)
    let localRef = ref

    whereList.forEach(w => {
        localRef = (localRef || ref).where(w.field, w.matchCriteria, w.matchValue)
    })
    return localRef.get()
}

module.exports = async (params, options, ref) => {
    try {
        verify('find', params.criteria)
        const result = await processWheres(params.criteria, ref)
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
