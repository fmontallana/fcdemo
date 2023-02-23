import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyCT9P7Ts8aLSOADXFGFc3qoFIt3Z5d2pek",
//     authDomain: "scheduling-system-e3bdb.firebaseapp.com",
//     projectId: "scheduling-system-e3bdb",
//     storageBucket: "scheduling-system-e3bdb.appspot.com",
//     messagingSenderId: "212881976657",
//     appId: "1:212881976657:web:bb93b70669ee9d6d2ef770"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBzMHpzAMz0vXPiTGjIHkYpsNQdbCjSUuc",
    authDomain: "frostcity-ac-services.firebaseapp.com",
    projectId: "frostcity-ac-services",
    storageBucket: "frostcity-ac-services.appspot.com",
    messagingSenderId: "338906425459",
    appId: "1:338906425459:web:519089eaf7652a65932206"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)

