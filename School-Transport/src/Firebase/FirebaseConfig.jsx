import {FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIRBASE_STORAGE_BUCKET,
  FIREBASE_MEESAGE_SENDER_ID,
  FIREBASE_APP_ID} from "@env";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIRBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MEESAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
let UID = "";
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

onAuthStateChanged(auth, (user) => {
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
  if (auth.currentUser) {
    console.log(auth.currentUser);
    return true;
  }
}

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export function GetUserUid() {
  return UID;
}

export const YserSignOut = () => {
  signOut(auth)
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
