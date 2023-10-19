// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-e259d.firebaseapp.com",
    projectId: "mern-estate-e259d",
    storageBucket: "mern-estate-e259d.appspot.com",
    messagingSenderId: "694971478474",
    appId: "1:694971478474:web:699c142dc5ed9f0f785f33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);