var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

export let db;

export async function connectFirebase(){
  try {
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    admin.firestore();
  } catch (error) {
    console.log('Error trying to connect to Firebase')
  }
}


