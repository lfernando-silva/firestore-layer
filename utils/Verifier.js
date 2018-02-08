const _ = require('lodash')

const paramsHasFields = (params, fields) => _.intersection(Object.keys(params),fields).length > 0

const obtainRequiredFields = (fnName) => {
    const fnRequiredFields = {
        'all': 'collection',
        'findById': 'id',
    }
    return fnRequiredFields[fnName]
}

module.exports = (fnName, params) => {
    const commaRegex = /,/g
    const requiredAllFields = obtainRequiredFields('all')
    const requiredFnNameFields = obtainRequiredFields(fnName)
    const paramsHasRequiredAllFields = requiredAllFields && paramsHasFields(params, requiredAllFields.split(commaRegex))
    const paramsHasSpecificRequiredFields = requiredFnNameFields && paramsHasFields(params, requiredFnNameFields.split(commaRegex))

    if(!params || !paramsHasRequiredAllFields || !paramsHasSpecificRequiredFields){
        throw new Error(`This operation requires the following fields: ${
            paramsHasRequiredAllFields
                ? requiredFnNameFields
                : requiredAllFields
            }.`)
    }
}
