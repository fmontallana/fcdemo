import React from 'react'
import { useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import { auth } from '../config/firebase'
import { useGlobals } from '../contexts/GlobalsContext'
import styles from '../style'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth)
    const { BASE_URL } = useGlobals()

    const actionCodeSettings = {
        url: `${BASE_URL}/login`,
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmail("")
        const promise = new Promise(async (resolve, reject) => {
            try {
                const success = await sendPasswordResetEmail(
                    email,
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

    return (
        <>
            <div className='flex flex-col '>
                <main className='flex-1 py-10 '>
                    <section className=" w-full ">
                        <div className="container mx-auto px-4 h-full">
                            <div className="flex content-center items-center justify-center h-full">
                                <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-white border-0 p-5 text-center">
                                        <h1 className='uppercase font-bold '>Forgot password</h1>
                                        <br />
                                        <hr />
                                        <br />

                                        <div className="relative w-full  text-left">
                                            <form onSubmit={handleSubmit}>
                                                {sending ? <p className='text-center py-5 mb-2'>Sending password reset link...</p> :
                                                    <>
                                                        <label
                                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Email address
                                                        </label>
                                                        <input
                                                            required
                                                            type="email"
                                                            className="mb-3 border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                            placeholder="Email"
                                                            style={{ transition: "all .15s ease" }}
                                                            name='email'
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </>}

                                                <button
                                                    type='submit'
                                                    className={`${styles.bg_accent} text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 w-full`}
                                                >
                                                    {sending ? "Sending..." : "Submit"}
                                                </button>
                                            </form>
                                        </div>

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

export default ForgotPassword