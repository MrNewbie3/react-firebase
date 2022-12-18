// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWdcl1bLAslbpmXOqwB6cp2yj_vdTked0",
  authDomain: "react-firebase-8a48e.firebaseapp.com",
  projectId: "react-firebase-8a48e",
  storageBucket: "react-firebase-8a48e.appspot.com",
  messagingSenderId: "199227989984",
  appId: "1:199227989984:web:c6fa31302b1770ad591585",
  measurementId: "G-C9BHKC528Z",
  databaseURL: "https://react-firebase-8a48e-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = firebase.initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

export default firebase;
