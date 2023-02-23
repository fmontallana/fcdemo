import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../config/firebase'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLogout } from '../hooks/useLogout'
import styles from '../style'

const VerifyAccount = () => {

    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth)
    const [currentUser] = useAuthState(auth)
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()
    const [logout] = useLogout()
    const [timer, setTimer] = useLocalStorage("verificationCountdown", 61)
    const [showResend, setShowResend] = useState(true)



    useEffect(() => {
        if (timer === 0) setShowResend(true)

        const time = setTimeout(() => {
            if (timer === 0) return
            if (timer <= 60) {
                setTimer(prev => prev - 1)
            }

        }, 1000);

        if (currentUser?.emailVerified) navigate('/account')

        return () => {
            clearTimeout(time)
        }

    }, [timer])






    const handleSubmit = async () => {
        setTimer(60)
        setShowResend(false)
        const success = await sendEmailVerification();
        if (success) {
            setSuccess(true)
            setTimeout(() => {

                setSuccess(false)
            }, 2000);
        }
    }



    if (!currentUser) return


    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }


    return (
        <>
            <div className='flex flex-col '>
                <main className='flex-1 py-10 '>
                    <section className=" w-full ">
                        <div className="container mx-auto px-4 h-full">
                            <div className="flex content-center items-center justify-center h-full">
                                <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-white border-0 p-5 text-center">
                                        <h1 className='uppercase font-bold '>Verify your account</h1>
                                        <br />
                                        <hr />
                                        <br />
                                        {error && <p className='text-sm p-1 bg-red-200 rounded-md border border-red-300 mb-3'>Error: {error.message}</p>}
                                        {sending && <p>Sending verification link...</p>}
                                        {!sending && <>
                                            <p>We will send a verification link to your e-mail.</p>
                                            <p>Kindly check your spam folder if you can't see it.</p>
                                            <br />
                                            <p>Refresh this page after successful verification.</p>
                                        </>}

                                        <br />
                                        <button
                                            className={`${styles.bg_accent} text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 w-full`}
                                            onClick={handleSubmit}
                                            disabled={timer < 61 && timer > 0 ? true : false}
                                        >
                                            {success ? "Email Sent " : showResend ? "Resend Verification " : "Verify Email "}
                                            {timer < 60 && timer > 0 ? `(${timer})` : ""}
                                        </button>
                                        {/* {showResend && <> <p>Resend email verification?</p>
                <button onClick={handleSubmit}>Resend</button> </>} */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

        </>
    )
}

export default VerifyAccount