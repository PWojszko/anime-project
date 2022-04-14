import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// const firebaseConfig = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

const firebaseConfig = {
  apiKey: "AIzaSyDh1W1wGr4gK7boTE_cg2_z6FlAnlORdx0",
  authDomain: "anime-project-dev.firebaseapp.com",
  projectId: "anime-project-dev",
  storageBucket: "anime-project-dev.appspot.com",
  messagingSenderId: "41481850322",
  appId: "1:41481850322:web:05bba6709eb03883ab0c0b",
  measurementId: "G-F73CKCE1SP",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
