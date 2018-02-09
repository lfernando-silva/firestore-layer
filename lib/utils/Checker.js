const _ = require('lodash')

const paramsHasFields = (params, fields) => {
    return _.intersection(Object.keys(params || {}),fields).length > 0
}

module.exports = {
    isArray: _.isArray,
    isEmpty: _.isEmpty,
    paramsHasFields
}
