import { cert, getApps, initializeApp, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let firebaseApp: App;
let auth: Auth;
let db: Firestore;

const initFirebaseAdmin = () => {
  if (!getApps().length) {
    firebaseApp = initializeApp({
        credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } else {
    firebaseApp = getApps()[0]; // Reuse existing app
  }

  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);

  return { auth, db };
};

const { auth: firebaseAuth, db: firestoreDb } = initFirebaseAdmin();

export { firebaseAuth as auth, firestoreDb as db };
