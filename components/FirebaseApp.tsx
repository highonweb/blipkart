import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDin8eb0XqDvHMCGOp8loA06vz-3CZvwBY",
  authDomain: "blipkart-f7e36.firebaseapp.com",
  projectId: "blipkart-f7e36",
  databaseURL: "https://blipkart-f7e36-default-rtdb.firebaseio.com",
  storageBucket: "blipkart-f7e36.appspot.com",
  messagingSenderId: "990356104835",
  appId: "1:990356104835:web:811779c90acbc637d51db6",
  measurementId: "G-70XRXVRRLH",
};
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
