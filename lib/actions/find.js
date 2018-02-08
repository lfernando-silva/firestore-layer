module.exports = async (params, options, ref) => {
    try {
        const {field, matchCriteria, matchValue} = params
        const result = await ref.where(field, matchCriteria, matchValue).get()
        return !result || options && options.rawData ? result._docs() : result._docs().map(doc => doc.data())
    } catch (err) {
        throw err
    }
}
