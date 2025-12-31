import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { localFirebaseConfig } from "./firebase.config.local.js";

// Usar variables de entorno si están disponibles, sino usar configuración local
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || localFirebaseConfig.apiKey || '').trim(),
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || localFirebaseConfig.projectId}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || localFirebaseConfig.projectId,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || localFirebaseConfig.projectId}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || localFirebaseConfig.appId,
};

console.log("Firebase config loaded:", {
  apiKey: firebaseConfig.apiKey ? "SET" : "MISSING",
  projectId: firebaseConfig.projectId || "MISSING",
  appId: firebaseConfig.appId ? "SET" : "MISSING",
  source: import.meta.env.VITE_FIREBASE_API_KEY ? "environment" : "local config",
});

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
