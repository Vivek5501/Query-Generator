// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "datawise-8116c.firebaseapp.com",
  projectId: "datawise-8116c",
  storageBucket: "datawise-8116c.appspot.com",
  messagingSenderId: "200848710525",
  appId: "1:200848710525:web:7042b52a8e0634a2ecca14",
  measurementId: "G-PD1GG9WEFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()