import { useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

export const useLogout = () => {
    const navigate = useNavigate()
    const [signOut] = useSignOut(auth);
    const { setIsloggedIn } = useAuth()
    const logout = () => {
        const promise = new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    localStorage.clear()
                    signOut()
                    setIsloggedIn(false)
                    navigate("/")
                    resolve("Logout Successful!")
                }, 2000);
            } catch (error) {
                reject("Logging out failed.")
            }
        })

        toast.promise(promise, {
            pending: "Signing out...",
            success: "Signed out!",
            error: "Error signing out."
        })
    }

    return [logout]
}