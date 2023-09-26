// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAw6yWMqcXjt5AQWxl7fRchLRfF-nsaX3E",
    authDomain: "react-native-firebase-au-ffdef.firebaseapp.com",
    projectId: "react-native-firebase-au-ffdef",
    storageBucket: "react-native-firebase-au-ffdef.appspot.com",
    messagingSenderId: "337273828993",
    appId: "1:337273828993:web:54604c02a183008ae53f80"
};

// Initialize Firebase
let UID = '';
export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


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
export const storage = getStorage(app);

export function IsLoggedIn() {
    if (auth.currentUser) {
        console.log(auth.currentUser);
        return true;
    }
}

export const firestoreDb = getFirestore(app)
export function getUserUid() {
    return UID
}

export const userSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        return true
    }).catch((error) => {
        // An error happened.
        alert(error.code);
        return false;
    });
}