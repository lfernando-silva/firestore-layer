const Checker = require('./Checker')

const obtainRequiredFields = (fnName) => {
    const fnRequiredFields = {
        'findById': 'id',
        'find': 'field,matchCriteria,matchValue',
        'upsert': 'none',
        'remove': 'id',
    }
    return fnRequiredFields[fnName]
}

module.exports = (fnName, params, options) => {
    const commaRegex = /,/g
    const requiredFnNameFields = obtainRequiredFields(fnName)

    if(requiredFnNameFields === 'none'){
        return true
    }

    const isArray = Checker.isArray(params)
    const isEmpty = Checker.isEmpty(params)

    if(isArray && isEmpty){
        throw new Error('An empty criteria array is invalid')
    }

    const paramsHasSpecificRequiredFields = requiredFnNameFields && isArray
        ? params.filter(param => Checker.paramsHasFields(param, requiredFnNameFields.split(commaRegex))).length === params.length
        : Checker.paramsHasFields(params, requiredFnNameFields.split(commaRegex))

    if(!paramsHasSpecificRequiredFields && options && !options.all){
        throw new Error(`This operation requires the following fields ${isArray && 'for all criterias'}: ${ requiredFnNameFields }.`)
    }
}
