import { createContext, useContext, useState, useEffect } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { db } from '../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()


export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [isloggedIn, setIsloggedIn] = useLocalStorage("isloggedIn", false)
    const [error, setError] = useState("")
    const [currentUser, setCurrentUser] = useLocalStorage('user', "")

    let navigate = useNavigate()

    const storeUser = async (data) => {
        try {
            const userRef = doc(db, "users", data.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                return
            } else {
                const user = {
                    name: data.displayName,
                    email: data.email,
                    photo: data.photoURL || `https://avatars.dicebear.com/api/adventurer-neutral/${data.email}.svg`,
                    uid: data.uid
                }
                const result = await setDoc(userRef, user);
            }
        } catch (error) {
            alert(error);
        }
    }

    const signUpWithEmailAndPassword = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            // setCurrentUser(result.user)
            await storeUser(result.user)
            // navigate('/account', { replace: true })
            return result.user
        } catch (error) {
            setError(error)
        }
    }

    const logInWithEmailAndPassword = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            // setCurrentUser(result.user)
            await storeUser(result.user)
            navigate('/account', { replace: true })
        } catch (error) {
            setError(error)
        }

    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            // setCurrentUser(result.user)
            await storeUser(result.user)
            navigate('/account', { replace: true })
        } catch (error) {
            setError(error)

        }


    }

    const logout = () => {
        signOut(auth)
        navigate('/', { replace: true })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user?.uid)
            user ? setIsloggedIn(true) : setIsloggedIn(false)
        })
        return unsubscribe

    }, [])

    const value = {
        isloggedIn,
        currentUser,
        signUpWithEmailAndPassword,
        logInWithEmailAndPassword,
        signInWithGoogle,
        logout,
        error,
        setError,
        setIsloggedIn
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
