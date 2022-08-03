import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAs-pQ_iiVBzGb_-gFb8vk_j2bAKOGcwmg",
  authDomain: "sherpa-16505.firebaseapp.com",
  projectId: "sherpa-16505",
  storageBucket: "sherpa-16505.appspot.com",
  messagingSenderId: "114021936571",
  appId: "1:114021936571:web:73143fe2445e00cc92a89e",
  measurementId: "G-4059YE3HXR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
