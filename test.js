const id = 'wGr1piJGeswQtEIuNgbh'
const collection = 'users'
const serviceAccountKey = require('./configs/firestore-test-194518-firebase-adminsdk-agupj-367d8a5018.json')

//@todo take out the path, client passes the JSON as param
const lib = require('./lib/index')(serviceAccountKey)

return lib
    .findById({collection,id}, {rawData: true})
    .then(result => {
        return console.log(result)
    }).catch(err => {
        return err
    })
