module.exports = async (params, options, ref) => {
    const {id} = params
    const result = await ref.doc(id).get()
    return options && options.rawData ? result : result.data()
}
