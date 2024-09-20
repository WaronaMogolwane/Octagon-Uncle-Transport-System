// lib/firebase.ts
import admin from "firebase-admin";

export const firebaseConfig = {
    credential: admin.credential.cert({
        "projectId": process.env.OUTS_FIREBASE_PROJECT_ID,
        "privateKey": process.env.OUTS_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "clientEmail": process.env.OUTS_FIREBASE_CLIENT_EMAIL,
    }

    ),
};

export const firebase = admin.apps.length
    ? admin.app()
    : admin.initializeApp(firebaseConfig);