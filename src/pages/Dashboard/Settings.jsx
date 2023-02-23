import React from 'react'
import { useState } from 'react'
import styles from '../../style'
import { useAuthState, useUpdateEmail, useUpdateProfile, useUpdatePassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { useUserContext } from '../../contexts/UserContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { SpinnerCircular } from 'spinners-react'
import { useGlobals } from '../../contexts/GlobalsContext'

const Settings = () => {

    const [user, loading, errorAuthState] = useAuthState(auth)
    const [updateProfile, updatingName, errorAuthUpdate] = useUpdateProfile(auth);
    const [updateEmail, updatingEmail, errorEmailUpdate] = useUpdateEmail(auth)
    const [updatePassword, updatingPasswordReset, errorPasswordReset] = useUpdatePassword(auth);
    const { getUserById, updatePhoneNumber, updateAddress } = useUserContext()
    const [name, setName] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [email, setEmail] = useState(null)
    const [address, setAddress] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [password, setPassword] = useState("")
    const [isFormChanging, setIsFormChanging] = useState(false)

    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth)
    const { BASE_URL } = useGlobals()
    const actionCodeSettings = {
        url: `${BASE_URL}/login`,
    };

    const handleEditProfile = async (e) => {
        e.preventDefault()
        setName("")
        setPhoneNumber("")
        setEmail("")
        setAddress("")
        setIsFormChanging(false)
        setUpdating(true)
        const promise = new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    if (name) await updateProfile({ displayName: name })
                    if (email) await updateEmail(email)
                    if (phoneNumber) await updatePhoneNumber(user.uid, phoneNumber)
                    if (address) await updateAddress(user.uid, address)
                    setUpdating(false)
                    resolve("Changes saved")
                } catch (error) {
                    reject(error)
                    setUpdating(false)
                }
            }, 2000);
        })

        toast.promise(promise, {
            pending: "Saving changes...",
            error: "Error saving.",
            success: "Changes saved."
        })


    }

    const handlePasswordReset = async () => {


        const promise = new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const pass = await updatePassword(password)
                    if (pass) alert("Password changed!")
                    if (errorPasswordReset) alert(errorPasswordReset.message)
                    setPassword("")
                    resolve("Password changed!")
                } catch (error) {
                    reject(error)
                }
            }, 2000);
        })

        toast.promise(promise, {
            pending: "Changing password...",
            error: "Error saving.",
            success: "Password changed."
        })
    }

    const resetPassword = async (e) => {
        e.preventDefault()

        setEmail("")
        const promise = new Promise(async (resolve, reject) => {
            try {
                const success = await sendPasswordResetEmail(
                    user.email,
                    actionCodeSettings
                )

                if (success) {
                    resolve(success)
                    toast.success("Email sent!")


                } else {
                    reject(error)
                    toast.error(error?.message.split(":")[1])
                }

            } catch (error) {
                reject(error)
                toast.error(error?.message.split(":")[1])
            }
        })
        // toast.promise(promise, {
        //     pending: "Sending email...",
        //     success: "Email sent.",
        //     error: error?.message.split(":")[1]
        // })
    }

    const showButton = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setIsFormChanging(false)
        } else {
            setIsFormChanging(true)
        }
    }

    return (
        <div className='flex flex-col gap-2 container  h-100 lg:w-3/6 sm:w-4/6 w-full  lg:mx-0'>
            <div className='font-bold capitalize text-slate-500 text-lg'>Edit profile</div>
            <form onSubmit={handleEditProfile}>
                <div className='flex flex-wrap gap-2 bg-white w-full h-100 rounded-md shadow-md p-5 mb-2'>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="name"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder={user.displayName}
                            style={{ transition: "all .15s ease" }}
                            name='name'
                            onChange={(e) => { showButton(e); setName(e.target.value) }}
                            value={name}

                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="phone-number"
                        >
                            Contact Number
                        </label>
                        <input
                            type="number"
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder={"Enter 11 digit mobile number or telephone number"}
                            style={{ transition: "all .15s ease" }}
                            name='phone-number'
                            onChange={(e) => { showButton(e); setPhoneNumber(e.target.value) }}
                            value={phoneNumber}

                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder={user.email}
                            style={{ transition: "all .15s ease" }}
                            name='email'
                            onChange={(e) => { showButton(e); setEmail(e.target.value) }}
                            value={email}

                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="address"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Street, District, Barangay, Postal Code, City / Municipality, Province"
                            style={{ transition: "all .15s ease" }}
                            name='address'
                            onChange={(e) => { showButton(e); setAddress(e.target.value) }}
                            value={address}

                        />
                    </div>
                    <div className="flex justify-end align-end w-full">
                        {isFormChanging && <button
                            className={`${isFormChanging ? styles.bg_accent : "bg-slate-400"} flex justify-center items-center gap-3 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 w-auto`}
                            type="submit"
                            disabled={!isFormChanging}
                            style={{ transition: "all .15s ease" }}
                        >
                            {updating ? <>
                                <p>updating</p>
                                <SpinnerCircular size={20} thickness={180} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                            </> : "update profile"}
                        </button>}
                    </div>
                </div>
            </form>

            <div className='font-bold capitalize text-slate-500 text-lg'>Change password</div>

            <div className='flex flex-wrap gap-5 bg-white w-full h-100 rounded-md shadow-md p-5 mb-2'>
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="reset-password"
                    >
                        Send password reset link
                    </label>
                    <div className='flex justify-center items-center w-full'>
                        <input
                            required
                            type="text"
                            className="flex-1 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded-l-md text-sm  focus:outline-none focus:ring shadow"
                            placeholder={user.email}
                            style={{ transition: "all .15s ease" }}
                            name='reset-password'
                            // value={user.email}
                            disabled
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className={`${styles.bg_accent} text-xs truncate flex justify-center items-center gap-3 text-white active:bg-gray-700 text-sm font-bold uppercase p-3 rounded-r-md shadow hover:shadow-lg hover:bg-red-600 outline-none focus:outline-none min-w-32 w-auto shadow`}
                            type="submit"
                            style={{ transition: "all .15s ease" }}
                            onClick={resetPassword}
                            disabled={sending}
                        >
                            {sending ? <>
                                <SpinnerCircular size={20} thickness={180} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                            </> : "Reset"}
                        </button>
                    </div>
                </div>
                <div className="flex justify-end align-end w-full">

                </div>
            </div>
        </div>
    )
}

export default Settings