// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcV_nrhRYdxA5dl-xUfj3C0gZYWYYRkp0",
  authDomain: "my-english-accent-239fb.firebaseapp.com",
  projectId: "my-english-accent-239fb",
  storageBucket: "my-english-accent-239fb.appspot.com",
  messagingSenderId: "635547438609",
  appId: "1:635547438609:web:f684b3583bd881dcd0abb0",
  measurementId: "G-ZVB10275Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(app);
const firebaseStorage = getStorage(app);
const auth = getAuth(app);

export { firebaseDB, app, auth, firebaseStorage };
