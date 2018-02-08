require('dotenv').config({path: '.env'})

const fixtures = {
    serviceAccountKey: require(process.env.SERVICE_ACCOUNT_PATH_TEST),
    collectionName: process.env.COLLECTION_NAME
}

const lib = require('../lib/index')(fixtures.serviceAccountKey)

test('It should throw error when query has no method name', async () => {
    await expect(lib.query()).rejects.toThrow();
})

test('It should throw error when query has no params', async () => {
    await expect(lib.query('findById')).rejects.toThrow();
})

test('It should throw error when query has no collection name', async () => {
    await expect(lib.query('findById',{id: 'eueuererepwire'})).rejects.toThrow();
})

test('It should throw error when query has no id', async () => {
    await expect(lib.query('findById', {collection: fixtures.collectionName})).rejects.toThrow();
})
