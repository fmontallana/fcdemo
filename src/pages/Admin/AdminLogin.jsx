import { useState } from 'react'
import bcrypt from "bcryptjs";
import styles from '../../style'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const AdminLogin = () => {

    const [userRole, setUserRole] = useLocalStorage("userRole", "")
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    let navigate = useNavigate()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        // encryptPassword()
        try {
            const q = query(collection(db, "users"), where("email", "==", input.username))
            const pass = await getDocs(q)
            if (!pass.empty) {
                pass?.forEach(async (doc) => {
                    setLoading(true)
                    const compare = await bcrypt.compare(input.password, doc.data().password)
                    setLoading(false)

                    if (compare) {
                        setUserRole("admin")
                        alert("Login successfully")
                        window.location.href = "/admin"
                    } else {
                        console.log("Invalid pass");
                    }
                })
            } else {
                alert("Invalid username")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const encryptPassword = async () => {
    //     const salt = await bcrypt.genSalt()
    //     const passwordHash = await bcrypt.hash(input.password, salt)
    //     console.log("🚀 ~ file: AdminLogin.jsx:42 ~ enc ~ passwordHash", passwordHash)
    //     const compare = await bcrypt.compare(input.password, "$2a$10$jckOpl5enXSFmMCpwkN1fODPdgzIrO9DIRwLgV.jxOEKRMA.dRxwC")
    //     console.log("🚀 ~ file: AdminLogin.jsx:45 ~ encryptPassword ~ compare", compare)

    //     const userRef = collection(db, "users")
    //     const addUser = await addDoc(userRef, { email: input.username, password: passwordHash })
    //     console.log("🚀 ~ file: AdminLogin.jsx:51 ~ encryptPassword ~ addUser", addUser)
    // }

    return (
        <div className='flex  h-screen'>

            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className={`flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-gradient-to-b ${styles.gradientFromTo}`}>
                            <div className="flex-auto px-4 lg:px-10 py-10">
                                <div className='flex justify-center items-center'>
                                    <img src={logo} alt="frostcity logo" />
                                </div>
                                <div className="text-white text-lg text-center my-3 font-bold ">
                                    Admin Login
                                </div>
                                <form onSubmit={handleLogin} >
                                    <div className=" w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-100 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            username
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Username"
                                            style={{ transition: "all .15s ease" }}
                                            name="username"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className=" w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-100  text-xs font-bold mb-2"
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
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                id="customCheckLogin"
                                                type="checkbox"
                                                className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                                                style={{ transition: "all .15s ease" }}
                                            />
                                            <span className="ml-2 text-sm font-semibold text-gray-100 ">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className={`${styles.bg_accent} text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 w-full`}
                                            type="submit"
                                            style={{ transition: "all .15s ease" }}
                                        >
                                            {!loading ? "Log in" : "Logging in..."}
                                        </button>
                                    </div>


                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default AdminLogin