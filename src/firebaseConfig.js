// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRbOH3vZ5rNk15ABTfZbJ29A-Zr3gceto",
  authDomain: "managelibrary-79b39.firebaseapp.com",
  projectId: "managelibrary-79b39",
  storageBucket: "managelibrary-79b39.appspot.com",
  messagingSenderId: "1005979762287",
  appId: "1:1005979762287:web:ddd86e40358c2f5f4c979a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
