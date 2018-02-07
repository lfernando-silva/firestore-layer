const admin = require('firebase-admin');
const path = require('path')

module.exports = (serviceAccountKeyPath) => {
    const credential = admin.credential.cert(require(path.join(process.cwd(), serviceAccountKeyPath)));
    admin.initializeApp({credential});
    return admin.firestore();
}
