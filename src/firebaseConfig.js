// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpL4SAW4hibzjtaw2AJGY8Rfqoxus5A9E",
  authDomain: "managelibrary-24c96.firebaseapp.com",
  projectId: "managelibrary-24c96",
  storageBucket: "managelibrary-24c96.appspot.com",
  messagingSenderId: "347236186237",
  appId: "1:347236186237:web:14e72fdd2add867f6d5914",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
