const id = 'wGr1piJGeswQtEIuNgbh'
const collection = 'users'

const lib = require('./lib/index')('./configs/firestore-test-194518-firebase-adminsdk-agupj-367d8a5018.json')

return lib
    .find({collection,id})
    .then(result => {
        return console.log(result)
    }).catch(err => {
        return err
    })
