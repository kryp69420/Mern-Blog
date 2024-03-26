
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dcf31.firebaseapp.com",
  projectId: "mern-blog-dcf31",
  storageBucket: "mern-blog-dcf31.appspot.com",
  messagingSenderId: "16371399435",
  appId: "1:16371399435:web:6f175bf5cb761e4c04400e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

