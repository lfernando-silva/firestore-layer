module.exports = async (params, options, ref) => {
    try {
        const {field, matchCriteria, matchValue} = params
        const result = await ref.where(field, matchCriteria, matchValue).get()
        const docs = result._docs()
        return !Array.isArray(docs) || !docs.length ? [] : !result || options && options.rawData ? docs : docs.map(doc => doc.data())
    } catch (err) {
        throw err
    }
}
