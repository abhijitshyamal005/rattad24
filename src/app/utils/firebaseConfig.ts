
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAPKiyRG8nNZc4PzVtqulQyTDSLLcJNE4o',
  authDomain: 'landing-page-9784d.firebaseapp.com',
  projectId: 'landing-page-9784d',
  storageBucket: 'landing-page-9784d.firebasestorage.app',
  messagingSenderId: '365863387018',
  appId: '1:365863387018:web:20ad8fc8e0c32985ed1273',
  measurementId: 'G-K4BR88ZP46',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export const firebaseAuth = getAuth(app);

