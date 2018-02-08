# firestore-datalayer
Sample nodejs firestore layer as a data a layer

# Pre-Requirements

- [NodeJS](https://nodejs.org)
- Setup [Firebase admin](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app)
- Service Account Key JSON file

# Requiring
- Pass the Service Account Key JSON file into lib constructor

```javascript
    const lib = require('path-to/lib')
    const serviceAccountKeyFile = require('path-to/serviceAccountKeyFile')
    
    const instance = lib(serviceAccountKeyFile) 
    
    //queries can be built now   
```

# Querying

```javascript
.query(functionName, params, [options])

```

- Returns a promise with the result or error.

Params:

* functionName (STRING - REQUIRED)  => The query name (see below)
* params (Object - REQUIRED) => The query params for each function (see below)
* options (Object - OPTIONAL) => Optional params to each query (see below)


## functionName  

It follow the mongoose convetions. The following functions are available:
- findById
- find
- upsert

## params
Each query requires its owm params

```javascript

lib.query('findById', {id : 'document id at firestore'})
//Executes db.collection(collection).doc(id).get()

lib.query('find', {
    field: 'fieldName', 
    matchCriteria: 'match criteria (=, >, ...',
    matchValue: 'value of match'
    }
)
//Executes db.collection(collection).where(fieldName, matchCriteria, matchValue).get()

lib.query('upsert', {...doc, id (optional)})
//Executes db.collection(collection).doc() .set(doc) or .add()


```

## options

- rawData (BOOLEAN) => Retrieve raw response from firebase on search queryies. Default is false, that returns just doc.data()
- returning (BOOLEAN) => Return the created/updated doc.

