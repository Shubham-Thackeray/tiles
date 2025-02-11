// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBnucVi3067iKM79s-A23wg71eI-r4H_k",
  authDomain: "tiles-43a40.firebaseapp.com",
  projectId: "tiles-43a40",
  storageBucket: "tiles-43a40.firebasestorage.app",
  messagingSenderId: "845194803863",
  appId: "1:845194803863:web:a03584bd614d4b881907d2",
  measurementId: "G-LPMRL5WP9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);