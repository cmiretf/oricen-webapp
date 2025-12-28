import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Intentar importar configuración local (solo si existe)
let localConfig = null;
try {
  const localModule = await import("./firebase.config.local.js");
  localConfig = localModule.localFirebaseConfig;
} catch (e) {
  // El archivo local no existe, continuar con variables de entorno
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || localConfig?.apiKey,
  authDomain:
    import.meta.env.VITE_FIREBASE_PROJECT_ID || localConfig?.projectId
      ? `${
          import.meta.env.VITE_FIREBASE_PROJECT_ID || localConfig?.projectId
        }.firebaseapp.com`
      : undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || localConfig?.projectId,
  storageBucket:
    import.meta.env.VITE_FIREBASE_PROJECT_ID || localConfig?.projectId
      ? `${
          import.meta.env.VITE_FIREBASE_PROJECT_ID || localConfig?.projectId
        }.firebasestorage.app`
      : undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || localConfig?.appId,
};

console.log("Firebase config loaded:", {
  apiKey: firebaseConfig.apiKey ? "SET" : "MISSING",
  projectId: firebaseConfig.projectId || "MISSING",
  appId: firebaseConfig.appId ? "SET" : "MISSING",
  source: localConfig ? "LOCAL_FILE" : "ENV_VARS",
});

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
