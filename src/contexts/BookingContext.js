import { createContext, useContext, useState } from "react";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, getCountFromServer, orderBy, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { MyModal } from "../components";
import { useToggle } from '../hooks/useToggle';
import { toast } from 'react-toastify'



const BookingContext = createContext();

const bookingRef = collection(db, "bookings");

export const useBooking = () => {
    return useContext(BookingContext)
}

export const BookingProvider = ({ children }) => {

    const [toggle, setToggle] = useState(false);
    const [selectedRow, setSelectedRow] = useState('')
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const addBooking = async (data) => {
        try {
            const docRef = await addDoc(bookingRef, data);
            setMessage("Booking added!");
            return docRef
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    const getBookings = async (userId, status) => {

        try {
            const q = query(bookingRef, where("userId", "==", userId), where("status", "==", status));
            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            return data
        } catch (error) {
            setError("Get bookings failed");
            console.log(error.message)
        }
    }

    const getAllBookingsByUserId = async (userId) => {

        try {
            const q = query(bookingRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            return data
        } catch (error) {
            setError("Get bookings failed");
            console.log(error.message)
        }
    }

    const getAllBookingsByStatus = async (status) => {

        try {
            const q = query(bookingRef, where("status", "==", status));
            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            return data
        } catch (error) {
            setError("Get bookings failed");
            console.log(error.message)
        }
    }

    const getAllBookingsByType = async (type, status) => {

        try {
            const q = query(bookingRef, where("type", "==", type), where("status", "==", status), orderBy("date", "asc"));
            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            return data
        } catch (error) {
            setError("Get bookings failed");
            console.log(error.message)
        }
    }

    const getBookingsByDate = async (date) => {

        try {
            const q = query(bookingRef, where("date", "==", date));
            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            return data
        } catch (error) {
            setError("Get bookings failed");
            console.log(error.message)
        }
    }

    const getAvailableSlot = async (date) => {

        try {
            const q = query(bookingRef, where("date", "==", date));
            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            return data
        } catch (error) {
            setError("Get available slot failed");
            console.log(error.message)
        }
    }

    const getSingleBooking = async (id) => {

        try {
            const docRef = doc(db, "bookings", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { ...docSnap.data(), id: docSnap.id };
            } else {
                alert("No such document!");
            }
        } catch (error) {
            setError("Get booking failed");
            console.log(error.message)
        }
    }

    const cancelBooking = async (id, remarks) => {

        try {
            const res = await updateDoc(doc(db, "bookings", id), {
                status: "cancelled",
                updatedAt: serverTimestamp(),
                remarks: remarks ? remarks : "Cancelled by user"
            });
            setMessage("Booking cancelled!");
            return res
        } catch (error) {
            setError("Error updating document: ", error);
        }
    }

    const updateBookingStatus = async (id, status) => {
        try {
            const res = await updateDoc(doc(db, "bookings", id), {
                status,
                updatedAt: serverTimestamp()
            });
            setMessage("Booking status updated");
            return res
        } catch (error) {
            setError("Error updating document: ", error);
        }
    }

    const countDocsByIdAndStatus = async (userId, status) => {
        try {
            const q = query(bookingRef, where("userId", "==", userId), where("status", "==", status));
            const querySnapshot = await getCountFromServer(q);
            return querySnapshot.data().count;
        } catch (error) {
            alert("Booking failed");
        }
    }

    const countDocsByStatus = async (status) => {
        try {
            const q = query(bookingRef, where("status", "==", status));
            const querySnapshot = await getCountFromServer(q);
            return querySnapshot.data().count;
        } catch (error) {
            alert("Booking failed");
        }
    }




    const toggleFunction = () => {
        setToggle(!toggle);
    }

    const value = {
        addBooking,
        getBookings,
        cancelBooking,
        getAllBookingsByUserId,
        getAllBookingsByStatus,
        getAvailableSlot,
        getBookingsByDate,
        getAllBookingsByType,
        getSingleBooking,
        toggle,
        toggleFunction,
        countDocsByIdAndStatus,
        countDocsByStatus,
        updateBookingStatus,
        selectedRow,
        setSelectedRow,
        message,
        setMessage,
        error,
        setError
    }

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );

}

export default BookingContext;