const verify = require('../utils/Verifier')
const FormatResult = require('../utils/FormatResult')
const FormatRawResult = require('../utils/FormatRawResult')
module.exports = async (params, options, ref) => {
    try{
        verify('findById', params)
        const {id} = params
        const result = await ref.doc(id).get()
        return options && options.rawData ? FormatRawResult(result) : FormatResult(result)
    } catch (err){
        throw err
    }

}
