// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_AYvGmzejr6ZQrFyDTJtAJJEgIXvs0Go",
  authDomain: "ecommerce-165b1.firebaseapp.com",
  projectId: "ecommerce-165b1",
  storageBucket: "ecommerce-165b1.appspot.com",
  messagingSenderId: "181750839642",
  appId: "1:181750839642:web:cbd2b0dbce1c82fe239b63",
  measurementId: "G-665WD5QDTF"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
