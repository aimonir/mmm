import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9-oceJenk4tGXR1WDTo1YLZDoLzM2jzk",
  authDomain: "student-a557e.firebaseapp.com",
  databaseURL: "https://student-a557e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "student-a557e",
  storageBucket: "student-a557e.firebasestorage.app",
  messagingSenderId: "161518881465",
  appId: "1:161518881465:web:c65295222869a1580ea968",
  measurementId: "G-Q2JGCQ1RT2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; // Named export
