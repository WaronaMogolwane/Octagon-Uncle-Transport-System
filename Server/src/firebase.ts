import admin from "firebase-admin";

if (
  !process.env.OUTS_FIREBASE_PROJECT_ID ||
  !process.env.OUTS_FIREBASE_PRIVATE_KEY ||
  !process.env.OUTS_FIREBASE_CLIENT_EMAIL
) {
  throw new Error("Missing Firebase environment variables. Please check your .env file.");
}

// Firebase configuration
export const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert({
    projectId: process.env.OUTS_FIREBASE_PROJECT_ID,
    privateKey: process.env.OUTS_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.OUTS_FIREBASE_CLIENT_EMAIL,
  }),
};

// Firebase initialization
export const firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(firebaseConfig);
