const _ = require('lodash')

const paramsHasFields = (params, fields) => _.intersection(Object.keys(params),fields).length > 0

const obtainRequiredFields = (fnName) => {
    const fnRequiredFields = {
        'findById': 'id',
        'find': 'field,matchCriteria,matchValue',
        'upsert': 'none'
    }
    return fnRequiredFields[fnName]
}

module.exports = (fnName, params) => {
    const commaRegex = /,/g
    const requiredFnNameFields = obtainRequiredFields(fnName)

    if(requiredFnNameFields === 'none'){
        return true
    }

    const paramsHasSpecificRequiredFields = requiredFnNameFields && paramsHasFields(params, requiredFnNameFields.split(commaRegex))

    if(!paramsHasSpecificRequiredFields){
        throw new Error(`This operation requires the following fields: ${ requiredFnNameFields }.`)
    }
}
