import { useState } from 'react'
import googleIcon from '../../assets/google-icon.svg'
import styles from '../../style'
import { useAuth } from '../../contexts/AuthContext'
import { MyModal } from '../../components'
import { useToggle } from '../../hooks/useToggle'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {

    let [isOpen, setIsOpen] = useToggle(false)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { signUpWithEmailAndPassword, signInWithGoogle, error, setError } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setInputs({
            email: '',
            password: '',
            confirmPassword: ''
        })

        if (inputs.password !== inputs.confirmPassword) return setError("Password do not match!")

        try {
            setLoading(true)
            const res = await signUpWithEmailAndPassword(inputs.email, inputs.email)
            setLoading(false)
            if (res) {
                toast.success("Account created!")
                navigate('/onboarding')
            }
        } catch (error) {
            toast.error("Sign up failed.")
            console.log(error.message)
        }
    }

    const handleGoogleSignIn = async () => {
        await signInWithGoogle()
    }

    function closeModal() {
        setIsOpen(false)
        setError("")
        setInputs({
            email: inputs.email,
            password: '',
            confirmPassword: ''
        })
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div className='flex flex-col h-screen'>
            <MyModal title={error !== "" ? "Sign Up Failed!" : null}
                details={error !== "" ? error.code?.substring(error.code?.indexOf('/') + 1).split("-").join(" ") || error : null}
                isOpen={error !== "" ? true : false}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal} />
            <main className='flex-1 pt-10 '>
                <section className=" w-full ">

                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Sign up with
                                            </h6>
                                        </div>
                                        <div className="btn-wrapper text-center">

                                            <button
                                                className="flex justify-center items-center gap-2 w-11/12 bg-blue-500 active:bg-gray-100 text-white font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md hover:bg-blue-600 inline-flex items-center font-bold text-xs"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                                onClick={handleGoogleSignIn}
                                            >
                                                <img
                                                    alt="..."
                                                    className="bg-white w-5 mr-1"
                                                    src={googleIcon}
                                                />
                                                sign up with Google
                                            </button>
                                        </div>
                                        <hr className="mt-5" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-gray-500 text-center mb-3 font-bold">
                                            <small>Or sign up with credentials</small>
                                        </div>

                                        <form onSubmit={handleSubmit}  >
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Email"
                                                    style={{ transition: "all .15s ease" }}
                                                    name='email'
                                                    onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                                    value={inputs.email}
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    required
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                    name='password'
                                                    onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                                    value={inputs.password}
                                                />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Confirm Password
                                                </label>
                                                <input
                                                    required
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Confirm Password"
                                                    style={{ transition: "all .15s ease" }}
                                                    name='confirmPassword'
                                                    onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                                    value={inputs.confirmPassword}
                                                />
                                            </div>

                                            <div className="text-center mt-6">
                                                <button
                                                    className={`${styles.bg_accent} text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 w-full`}
                                                    type="submit"
                                                    style={{ transition: "all .15s ease" }}
                                                >
                                                    {!loading ? "Sign up" : "Signing up..."}
                                                </button>
                                            </div>


                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Signup