// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuZH_jB8_DMIaCnI0Gki8aMuK_kwV5oE4",
  authDomain: "practical-4c3d9.firebaseapp.com",
  projectId: "practical-4c3d9",
  storageBucket: "practical-4c3d9.firebasestorage.app",
  messagingSenderId: "781290768020",
  appId: "1:781290768020:web:47ffc7c13a573a0cb39681",
  measurementId: "G-WDV6LJNYK9"
};


// # apiKey: "AIzaSyCuZH_jB8_DMIaCnI0Gki8aMuK_kwV5oE4",
// #   authDomain: "practical-4c3d9.firebaseapp.com",
// #   projectId: "practical-4c3d9",
// #   storageBucket: "practical-4c3d9.firebasestorage.app",
// #   messagingSenderId: "781290768020",
// #   appId: "1:781290768020:web:47ffc7c13a573a0cb39681",
// #   measurementId: "G-WDV6LJNYK9"

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);