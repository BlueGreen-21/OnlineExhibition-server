const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
const serviceAccount = require('./bluegreen-oe-firebase-adminsdk-ksgeb-adac478161.json'); // 여기에 credential 파일을 집어넣을 것
const dotenv = require('dotenv');

dotenv.config();

let firebase;
if (admin.apps.length === 0){
    firebase = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    firebase = admin.app();
}

module.exports = {
    api: require('./api'),
};