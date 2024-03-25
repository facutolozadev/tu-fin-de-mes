import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBoUDfRH1zEWmKZUCrKfkyquAIcnRpsr9k",
  authDomain: "tu-fin-de-mes-1bc52.firebaseapp.com",
  projectId: "tu-fin-de-mes-1bc52",
  storageBucket: "tu-fin-de-mes-1bc52.appspot.com",
  messagingSenderId: "589420530029",
  appId: "1:589420530029:web:bb7ff65f8fa4b84fe4f264",
  measurementId: "G-LLZGRVGBVV",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
