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
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
  projectId: process.env.REACT_APP_PROJECTID_FIREBASE,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID_FIREBASE,
  appId: process.env.REACT_APP_APPID_FIREBASE,
  measurementId: process.env.REACT_APP_MEASUREMENTID_FIREBASE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(app);
const firebaseStorage = getStorage(app);
const auth = getAuth(app);

export { firebaseDB, app, auth, firebaseStorage };
