import firebase from "firebase";

export const config = {  
  apiKey: "AIzaSyB5tB_NvAxsQAd4aNL4gefm3KbHdRLDpig",
  authDomain: "psu-care-bf729.firebaseapp.com",
  databaseURL: "https://psu-care-bf729-default-rtdb.firebaseio.com",
  projectId: "psu-care-bf729",
  storageBucket: "psu-care-bf729.appspot.com",
  messagingSenderId: "144504254617",
  appId: "1:144504254617:web:68522f959e8581a0f18808",
  measurementId: "G-8PRVCW8F4J"
};

try {
    firebase.initializeApp(config);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
  
  const app = firebase.app();
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  export { firebase, auth, db };
  console.log(app.name ? "Firebase Mode Activated!" : "Firebase not working :(");
  