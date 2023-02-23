import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'

export const googleSignIn = () => {
    const result = signInWithPopup(auth, googleProvider)
        .then(res => res)
        .catch(err => console.log(err))
    console.log(result);
}