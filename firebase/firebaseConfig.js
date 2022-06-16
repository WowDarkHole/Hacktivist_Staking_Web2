import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYrR6U-Xi1MHDVNA2ToVyJgfxW7CN6Wyo",
  authDomain: "hacktivst.firebaseapp.com",
  projectId: "hacktivst",
  storageBucket: "hacktivst.appspot.com",
  messagingSenderId: "370737369883",
  appId: "1:370737369883:web:47ddc54046dbc00c1fb9be",
  measurementId: "G-F3PFE3813F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);