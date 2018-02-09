var admin = require('firebase-admin');

module.exports = function (serviceAccountKeyPath) {
  var credential = admin.credential.cert(serviceAccountKeyPath);
  admin.initializeApp({
    credential: credential
  });
  return admin.firestore();
};