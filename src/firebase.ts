import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // You'll need to replace these with your own Firebase config
  apiKey: "AIzaSyDprYSs03n3kPtHLf6BApB5WJt5ikoMN7I",
  authDomain: "lexi-vd18.firebaseapp.com",
  projectId: "lexi-vd18",
  storageBucket: "lexi-vd18.firebasestorage.app",
  messagingSenderId: "682207184349",
  appId: "1:682207184349:web:1b377840115bf20d3da234",
  databaseURL: "https://lexi-vd18-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app); 


