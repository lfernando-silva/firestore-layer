const verify = require('../../utils/Verifier')
module.exports = async (params, options, ref) => {
    verify('remove', params)
    const id = params.id
    delete params.id
    return await ref.doc(id).delete()
}
