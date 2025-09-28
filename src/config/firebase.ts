import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyCcXwIe247mtVvFFUKQInUgAe3bxNUA9JI",
  authDomain: "base-token-launcher.firebaseapp.com",
  projectId: "base-token-launcher",
  storageBucket: "base-token-launcher.firebasestorage.app",
  messagingSenderId: "822487937652",
  appId: "1:822487937652:web:bda3680f4a0df7b2399721",
  measurementId: "G-LZZXFZ3502"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Analytics only if supported
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null)