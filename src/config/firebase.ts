// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getMessaging, isSupported } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCcXwIe247mtVvFFUKQInUgAe3bxNUA9JI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "base-token-launcher.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "base-token-launcher",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "base-token-launcher.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "822487937652",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:822487937652:web:bda3680f4a0df7b2399721",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LZZXFZ3502"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

// Initialize messaging (only if supported)
export let messaging: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

// Initialize emulators in development
if (import.meta.env.DEV && !import.meta.env.VITE_FIREBASE_USE_PRODUCTION) {
  try {
    // Connect to Firestore emulator
    connectFirestoreEmulator(db, 'localhost', 8080);
    
    // Connect to Auth emulator
    connectAuthEmulator(auth, 'http://localhost:9099');
    
    // Connect to Functions emulator
    connectFunctionsEmulator(functions, 'localhost', 5001);
    
    // Connect to Storage emulator
    connectStorageEmulator(storage, 'localhost', 9199);
    
    console.log('🔥 Firebase emulators connected');
  } catch (error) {
    console.warn('Firebase emulators connection failed:', error);
  }
}

export default app;