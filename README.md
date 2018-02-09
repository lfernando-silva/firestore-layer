# firestore-layer

Nodejs firestore interface to make easily requests firestore.

# Pre-Requirements

- [NodeJS](https://nodejs.org)
- Setup [Firebase admin](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app)
- Service Account Key JSON file

# Installing

```bash
$ npm install --save firestore-layer
```

# Requiring
- Pass the Service Account Key JSON file into the lib constructor

```javascript
    const FirestoreDatalayer = require('firestore-layer')
    const serviceAccountKeyFile = require('path-to/serviceAccountKeyFile')
    
    const datalayer = FirestoreDatalayer(serviceAccountKeyFile) 
    
    //queries can be built now   
```

# Querying

```javascript
datalayer.query(functionName, params, [options])
```

- Returns a promise with the result or error.

Params:

* functionName (STRING - REQUIRED)  => The query name (see below)
* params (Object - REQUIRED) => The query params for each function (see below)
* options (Object - OPTIONAL) => Optional params to each query (see below)

## functionName  

The following functions are available:
- findById
- find
- upsert
- remove

## params
Each query requires its owm params

```javascript

lib.query('findById', {id : 'document id at firestore'})
//Executes db.collection(collection).doc(id).get()

lib.query('find', {criteria: [{field,matchCriteria,matchValue}]})
//Executes db.collection(collection).where(fieldName, matchCriteria, matchValue).get()

lib.query('upsert', {...doc, id })
//Executes db.collection(collection).doc() .set(doc) or .add()

lib.query('remove', {...doc, id })
//Executes db.collection(collection).doc(id).delete()
```

## options

- rawData (BOOLEAN) => Retrieve raw response from firebase on search queryies. Default is FALSE (returns just doc.data())
- returning (BOOLEAN) => Return the created/updated doc. Default is FALSE.
- merge (BOOLEAN) => Perform a pontual update, and DONT replace the original document. Equivalent to update with $set at mongoDb. Default is FALSE.
- orderBy (ARRAY OF OBJECTS) => Retrieve the result ordered by criteria. Such criteria must be an object with format {field,order}. Default is the index criteria order.
- limit (NUMBER) => Returns a set of documents with lenght as the limit passed. Default is total number of documents that match the criteria.
- all (BOOLEAN) => Returns all documents at collection

# Notes
- Firestore is in Beta version. This library may be unstable.
- This module is transpiled using [Babel](https://babeljs.io) to NodeJS 6.11 (to work at firebase cloud functions)
- To perform find queries with sort, [is necessary to create an index for EACH document field at firestore](https://firebase.google.com/docs/firestore/query-data/indexing). In this case, we CAN NOT change the document structure (make an schema).

# Tests (not all covered)
```bash
$ npm test
```

# Todos
- Realtime updates
- Follow the firestore upgrades

# Contributions
- Is welcome.
- For now, its just make your PR with a [Jest](https://facebook.github.io/jest/) test. 

# License
MIT

