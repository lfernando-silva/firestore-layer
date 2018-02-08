const _ = require('lodash')

const paramsHasFields = (params, fields) => _.intersection(Object.keys(params),fields).length > 0

const obtainRequiredFields = (fnName) => {
    const fnRequiredFields = {
        'all': 'collection',
        'findById': 'id',
        'find': 'field,matchCriteria,matchValue',
        'upsert': 'none'
    }
    return fnRequiredFields[fnName]
}

module.exports = (fnName, params) => {
    if(!fnName || typeof fnName !== 'string'){
        throw new Error(`This operation requires the name of the function. See docs for details`)
    }

    if(!params || typeof params !== 'object'){
        throw new Error(`This operation requires a params object for function ${fnName}. See docs for details`)
    }

    const commaRegex = /,/g
    const requiredAllFields = obtainRequiredFields('all')
    const requiredFnNameFields = obtainRequiredFields(fnName)

    if(requiredFnNameFields === 'none'){
        return true
    }

    const paramsHasRequiredAllFields = requiredAllFields && paramsHasFields(params, requiredAllFields.split(commaRegex))
    const paramsHasSpecificRequiredFields = requiredFnNameFields && paramsHasFields(params, requiredFnNameFields.split(commaRegex))

    if(!paramsHasRequiredAllFields || !paramsHasSpecificRequiredFields){
        throw new Error(`This operation requires the following fields: ${
            paramsHasRequiredAllFields
                ? requiredFnNameFields
                : requiredAllFields
            }.`)
    }
}
