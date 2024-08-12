// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  REACT_APP_API_KEY,
  REACT_APP_APP_ID,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_MEASUREMENT_ID,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
} from "@/lib/apiEndPoints";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQXpDYQD57UtkEKvIPKAaH4zHgOSHVI6A",
  authDomain: "hirelab-chat.firebaseapp.com",
  projectId: "hirelab-chat",
  storageBucket: "hirelab-chat.appspot.com",
  messagingSenderId: "849696165470",
  appId: "1:849696165470:web:d1578e91ba9040f36baecf",
  // measurementId: REACT_APP_MEASUREMENT_ID,
};
console.log('first', firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
