import { useState } from 'react'
import googleIcon from '../../assets/google-icon.svg'
import styles from '../../style'
import { useAuth } from '../../contexts/AuthContext'
import { MyModal } from '../../components'
import { useToggle } from '../../hooks/useToggle'
import { Link } from 'react-router-dom'

const Login = () => {

    const [inputs, setInputs] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const { signInWithGoogle, logInWithEmailAndPassword, error, setError } = useAuth()
    let [isOpen, setIsOpen] = useToggle(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setInputs({ email: '', password: '' })
        await logInWithEmailAndPassword(inputs.email, inputs.password)
        setLoading(false)

    }

    function closeModal() {
        setIsOpen(false)
        setError("")
        setInputs({ email: "", password: '' })
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div className='flex flex-col h-screen'>
            <MyModal title={error !== "" ? "Login Failed!" : null}
                details={error !== "" ? error.code.substring(error.code.indexOf('/') + 1).split("-").join(" ") : null}
                isOpen={error !== "" ? true : false}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal} />
            <main className='flex-1 pt-10 '>
                <section className=" w-full ">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Sign in with
                                            </h6>
                                        </div>
                                        <div className="btn-wrapper text-center">

                                            <button
                                                className="flex justify-center items-center gap-2 w-11/12 bg-blue-500 active:bg-gray-100 text-white font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md hover:bg-blue-600 inline-flex items-center font-bold text-xs"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                                onClick={signInWithGoogle}
                                            >
                                                <img
                                                    alt="..."
                                                    className="bg-white w-5 mr-1"
                                                    src={googleIcon}
                                                />
                                                sign in with Google
                                            </button>
                                        </div>
                                        <hr className="mt-5 " />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-gray-500 text-center mb-3 font-bold">
                                            <small>Or sign in with credentials</small>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Email"
                                                    style={{ transition: "all .15s ease" }}
                                                    name='email'
                                                    onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
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
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                    name='password'
                                                    onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                                />
                                            </div>
                                            {/* <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                                                        style={{ transition: "all .15s ease" }}
                                                    />
                                                    <span className="ml-2 text-sm font-semibold text-gray-700">
                                                        Remember me
                                                    </span>
                                                </label>
                                            </div> */}

                                            <div className="text-center mt-6">
                                                <button
                                                    className={`${styles.bg_accent} text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 w-full`}
                                                    type="submit"
                                                    style={{ transition: "all .15s ease" }}
                                                >
                                                    {!loading ? "Log in" : "Logging in..."}
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap ">
                                                <div className="w-1/2">
                                                    <Link
                                                        className="text-gray-300"
                                                        to={'/forgot-password'}>
                                                        <small>Forgot password?</small>
                                                    </Link>
                                                </div>
                                                <div className="w-1/2 text-right">
                                                    <Link
                                                        className="text-gray-300"
                                                        to={'/signup'}>
                                                        <small>Create New Account</small>
                                                    </Link>
                                                </div>
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

export default Login