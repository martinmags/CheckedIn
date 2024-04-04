// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRESTORE_API_KEY,
  authDomain: "checkedin-cf697.firebaseapp.com",
  projectId: "checkedin-cf697",
  storageBucket: "checkedin-cf697.appspot.com",
  messagingSenderId: "329730659910",
  appId: "1:329730659910:web:00a718adc0b1ff09c0dc47",
  measurementId: "G-7NSLPK0G77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);