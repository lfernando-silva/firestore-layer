module.exports = (fnName, params) => {
    if(!fnName || typeof fnName !== 'string'){
        throw new Error(`This operation requires the name of the function. See docs for details`)
    }

    if(!params || typeof params !== 'object'){
        throw new Error(`This operation requires a params object for function ${fnName}. See docs for details`)
    }

    if(!params.collection){
        throw new Error(`This operation requires collection to query.`)
    }
}
