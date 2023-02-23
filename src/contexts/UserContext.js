import { createContext, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {

    const getUserById = async (id) => {
        try {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data()
            } else {
                alert("No such document!");
            }
        } catch (error) {
            alert("Error getting document:", error);
        }
    }

    const updatePhoneNumber = async (id, phone) => {
        try {
            const docRef = doc(db, "users", id);
            await updateDoc(docRef, {
                phone: phone
            }, { merge: true });
        } catch (error) {
            alert("Error updating phone number:", error);
        }
    }

    const updateAddress = async (id, address) => {
        try {
            const docRef = doc(db, "users", id);
            await updateDoc(docRef, {
                address: address
            }, { merge: true });
        } catch (error) {
            alert("Error updating address:", error);
        }
    }

    const value = {
        getUserById,
        updatePhoneNumber,
        updateAddress
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext