import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAeSdKkusN_FKUW7ES2xlyX6OcbmMIrs8Q",
  authDomain: "tutorsportal-d161c.firebaseapp.com",
  projectId: "tutorsportal-d161c",
  storageBucket: "tutorsportal-d161c.firebasestorage.app",
  messagingSenderId: "492213702975",
  appId: "1:492213702975:web:f877f37e240e1bc58c438a",
  measurementId: "G-64Z48FWT7Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Firestore initialization

export { db };
