import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBQ1hamIUVZFwjc_wMNg0mza35mFtPvkLg",
    authDomain: "fcdemo-d08de.firebaseapp.com",
    projectId: "fcdemo-d08de",
    storageBucket: "fcdemo-d08de.appspot.com",
    messagingSenderId: "240461510778",
    appId: "1:240461510778:web:12f822776e6bc43264a3c3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)

