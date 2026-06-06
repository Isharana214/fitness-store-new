import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // અહીં GoogleAuthProvider ઉમેરો
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRRCI7nal0CkJ6b17IvNm9vTS7WmlmzUk", 
  authDomain: "fitness-dashboard-45114.firebaseapp.com",
  projectId: "fitness-dashboard-45114",
  storageBucket: "fitness-dashboard-45114.firebasestorage.app",
  messagingSenderId: "538791220108",
  appId: "1:538791220108:web:0e9ebb2374edf3039a3ca9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(); // આ લાઈન ઉમેરો