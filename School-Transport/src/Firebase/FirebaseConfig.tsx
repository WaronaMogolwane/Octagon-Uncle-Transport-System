// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIRBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MEESAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
let UID = "";
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

onAuthStateChanged(FIREBASE_AUTH, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    UID = uid;

    // ...
  } else {
    // User is signed out
    // ...
  }
});

// Initialize Cloud Storage and get a reference to the service
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export function IsLoggedIn() {
  if (FIREBASE_AUTH.currentUser) {
    return true;
  }
}

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export function GetUserUid() {
  return "KJSBIUERHI8FG";
}

export const UserSignOut = () => {
  signOut(FIREBASE_AUTH)
    .then(() => {
      // Sign-out successful.
      return true;
    })
    .catch((error) => {
      // An error happened.
      alert(error.code);
      return false;
    });
};
