const findById = require('./findById')

module.exports = async (params, options, ref) => {
    const id = params.id
    delete params.id
    const result = id
        ? await ref.doc(id).set(params)
        : await ref.add(params)
    return options && options.returning? findById({id: result.id || id}, null, ref) : result
}
