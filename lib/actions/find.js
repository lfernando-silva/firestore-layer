const verify = require('../../utils/Verifier')
const FormatResult = require('../../utils/FormatResult')
const FormatRawResult = require('../../utils/FormatRawResult')
module.exports = async (params, options, ref) => {
    try {
        verify('find', params)
        const {field, matchCriteria, matchValue} = params
        const result = await ref.where(field, matchCriteria, matchValue).get()
        const docs = result._docs()
        return !Array.isArray(docs) || !docs.length
            ? []
            : !result || options && options.rawData
                ? FormatRawResult(docs)
                : docs.map(doc => FormatResult(doc.data()))
    } catch (err) {
        throw err
    }
}
