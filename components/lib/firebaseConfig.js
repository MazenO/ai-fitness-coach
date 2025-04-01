// components/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fbauth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestore = getFirestore(app);

export { app, fbauth, firestore };
