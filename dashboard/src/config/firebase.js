import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "PASTE_YOUR_REAL_API_KEY_HERE",
  authDomain: "aion-fc6de.firebaseapp.com",
  projectId: "aion-fc6de",
  storageBucket: "aion-fc6de.firebasestorage.app",
  messagingSenderId: "342374661194",
  appId: "PASTE_YOUR_REAL_APP_ID_HERE",
  measurementId: "G-15J4C525QQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const firebaseEnabled = true;
