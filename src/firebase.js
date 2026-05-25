import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC40Yu8ClT-m1Su7-LDhi9g-eKU3TR9mKY",
  authDomain: "hikesandmiles-6d636.firebaseapp.com",
  projectId: "hikesandmiles-6d636",
  storageBucket: "hikesandmiles-6d636.firebasestorage.app",
  messagingSenderId: "651407267463",
  appId: "1:651407267463:web:80b30eb8c04a3d389dca22"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);