// Import the functions you need from the SDKs you need
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: " AIzaSyCvmVcBEMEN0KZy7dE79EqaA076b3LYHhg",

  authDomain: "cryptodc-ed668.firebaseapp.com",

  projectId: "cryptodc-ed668",

  storageBucket: "cryptodc-ed668.appspot.com",

  messagingSenderId: "61987501699",

  appId: "1:61987501699:web:68260858a5b8daacd68db6",

  measurementId: "G-BSR9GLSTL4",
};

// Initialize Firebase
initializeApp();

const db = getFirestore();

export default app;