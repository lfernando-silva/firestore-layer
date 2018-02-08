module.exports = async (params, options, ref) => {
    const {id} = params
    const result = await ref.doc(id).get()
    return !result || options && options.rawData ? result : result.data()
}
