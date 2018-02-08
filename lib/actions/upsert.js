const verify = require('../../utils/Verifier')
const findById = require('./findById')
const find = require('./find')

const findByStrategy = (id, params, options, ref) => id
    ? findById({id}, options, ref)
    : find(params,options,ref)

module.exports = async (params, options, ref) => {
    verify('upsert', params)
    const id = params.id
    delete params.id
    const result = id
        ? ref.doc(id).set(params, options)
        : ref.add(params, options)
    return options && options.returning? findByStrategy(result.id || id, params, options, ref) : result
}
