const admin = require('firebase-admin');

module.exports = (serviceAccountKeyPath) => {
    const credential = admin.credential.cert(serviceAccountKeyPath);
    admin.initializeApp({credential});
    return admin.firestore();
}
