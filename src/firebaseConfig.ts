import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration - retrieved via Firebase CLI:
// npx -y firebase-tools@latest apps:sdkconfig WEB 1:414466538309:web:d03e423130422d70615c2c
const firebaseConfig = {
  apiKey: "AIzaSyDZ0Kq7F72Q-0IX4OAEVAHTGKzhN1USMGA",
  authDomain: "flipbook-81955.firebaseapp.com",
  projectId: "flipbook-81955",
  storageBucket: "flipbook-81955.firebasestorage.app",
  messagingSenderId: "414466538309",
  appId: "1:414466538309:web:d03e423130422d70615c2c",
  measurementId: "G-HY4VDCWE1S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
