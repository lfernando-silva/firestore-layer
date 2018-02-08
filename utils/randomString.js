const randomstring = require('randomstring')

module.exports = (options) => randomstring.generate(options || {
    length: 25,
    readable: true,
    alphanumeric: true,
    capitalization: null
})
