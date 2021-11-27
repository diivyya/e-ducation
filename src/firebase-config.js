import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDd_GHbMF7QQa9DJX1T5aNwY1ZtzCxzW8Y",
    authDomain: "e-ducation-e3522.firebaseapp.com",
    projectId: "e-ducation-e3522",
    storageBucket: "e-ducation-e3522.appspot.com",
    messagingSenderId: "800380852984",
    appId: "1:800380852984:web:325a08a362100baf19790d",
    measurementId: "G-5QNER5WQBY"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = app.auth()

export default app

