import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import branding from '../assets/frostcity-logo.png'
import styles from '../style'
import { Home, CalendarEvent, Settings, Logout, ChevronDown, ChevronRight } from 'tabler-icons-react'
import { useToggle } from '../hooks/useToggle'
import { useAuth } from '../contexts/AuthContext'
import { adminSidebarLinks, userSidebarLinks } from '../constants'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLogout } from '../hooks/useLogout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

const Sidebar = ({ toggle, show }) => {
    const [active, setActive] = useState("home");
    const [showBookings, toggleBookings] = useToggle(true)
    const [currentUser] = useAuthState(auth)
    // const { currentUser } = useAuth()
    const [userRole, setUserRole] = useLocalStorage("userRole", "")
    const ADMIN_PROFILE_PIC = "https://api.lorem.space/image/face?w=150&h=150&hash=9D9539E7";
    const [logout] = useLogout()

    const handleClick = (tab) => {
        setActive(tab)
        if (window.innerWidth >= "640") return
        toggle(!show)
    }

    const UserDashboardNavlinks = () => {

        return (
            <div className='flex flex-col mt-3 ml-5 gap-2 w-full text-white'>
                <Link onClick={() => handleClick("home")} to="/account">
                    <div className={`flex items-center gap-5 capitalize px-4 py-2  rounded-lg w-9/12 hover:shadow-lg ${active === "home" ? "bg-red-500 shadow-lg hover:shadow-xl" : null}`}>
                        <Home />
                        Dashboard
                    </div>
                </Link>
                <button className={`capitalize flex justify-start items-center gap-5  px-4 py-2 rounded-lg w-9/12 hover:shadow-lg`} onClick={toggleBookings}>
                    <CalendarEvent size={24} />
                    <span>Bookings</span>
                    <div className='flex justify-end '>
                        {showBookings ? <ChevronDown /> : <ChevronRight />}
                    </div>
                </button>

                {showBookings && <div className='border-l-2 ml-10'>
                    {userSidebarLinks.map(link => {
                        if (link.link.includes("/book")) {
                            return (
                                <Link onClick={() => handleClick(link.title)} to={link.link}>
                                    <div key={link.id} className={`capitalize ml-2 px-4 py-2 pl-5 pr-10 w-9/12 rounded-lg hover:shadow-lg ${active === link.title ? "bg-red-500 shadow-lg hover:shadow-xl" : null}`}>
                                        {link.title}
                                    </div>
                                </Link>
                            )
                        }
                    })}
                </div>}

                <Link onClick={() => handleClick("settings")} to="/account/settings">
                    <div className={`flex items-center gap-5 capitalize px-4 py-2 w-9/12 rounded-lg hover:shadow-lg ${active === "settings" ? "bg-red-500 shadow-lg hover:shadow-xl" : null}`}>
                        <Settings />
                        Settings
                    </div>
                </Link>

                <button className='capitalize' onClick={() => { setActive("logout"); logout(); localStorage.clear() }} >
                    <div className={`flex items-center gap-5 capitalize px-4 py-2 w-9/12 rounded-lg hover:shadow-lg ${active === "logout" ? "bg-red-500 shadow-lg hover:shadow-xl" : null}`}>
                        <Logout />
                        Logout
                    </div>
                </button>
            </div>
        )
    }

    const AdminDashboardNavlinks = () => {

        return (
            <div className='flex flex-col mt-3 ml-5 gap-2 w-full text-white'>
                <Link onClick={() => handleClick("home")} to="/admin">
                    <div className={`capitalize flex items-center gap-5  px-4 py-2 rounded-lg w-9/12 hover:shadow-lg ${active === "home" ? "bg-red-500 shadow-lg hover:shadow-xl" : null}`}>
                        <Home />
                        Dashboard
                    </div>
                </Link>
                <button className={`capitalize flex justify-start items-center gap-5  px-4 py-2 rounded-lg w-9/12 hover:shadow-lg`} onClick={toggleBookings}>
                    <CalendarEvent size={24} />
                    <span >bookings</span>
                    <div className='flex justify-end '>
                        {showBookings ? <ChevronDown /> : <ChevronRight />}
                    </div>
                </button>

                {showBookings && <div className='flex flex-col border-l-2 ml-10'>
                    {adminSidebarLinks.map(link => {
                        if (link.link.includes("admin/")) {
                            return (
                                <Link onClick={() => handleClick(link.title)} to={link.link}>
                                    <div key={link.id} className={`capitalize  ml-2 px-4 py-2 pl-5 pr-10 w-9/12 rounded-lg hover:shadow-lg ${active === link.title ? "bg-red-500 shadow-lg hover:shadow-xl" : null}`}>
                                        {link.title}
                                    </div>
                                </Link>
                            )
                        }
                    })}
                </div>}
                <button className='capitalize' onClick={() => { setActive("logout"); logout(); }} >
                    <div className={`capitalize flex items-center gap-5  px-4 py-2 w-9/12 rounded-lg hover:shadow-lg ${active === "logout" ? "bg-red-500 shadow-lg hover:shadow-xl" : null}`}>
                        <Logout />
                        logout
                    </div>
                </button>
            </div>
        )
    }

    return (
        <div className='h-screen overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col justify-start items-start mx-auto shadow'>
            <Link className='w-full' to={'/'}>
                <div className='w-full mx-auto h-[3rem] flex justify-center items-center  space-x-3 '>
                    <div className='w-[32px]'>
                        <img className='object-contain' src={branding} alt="brand-logo" />
                    </div>
                    <h6 className='font-black text-white text-[1.5rem]'>FROST<span className={`${styles.text_wildRice}`}>CITY</span></h6>
                </div>
            </Link>
            <hr className='border-teal-500 self-center  w-10/12' />
            <br />
            {userRole !== "admin" && <div className='flex flex-col justify-center items-center w-full gap-2 text-white '>
                <div className='rounded-full shadow overflow-hidden'>
                    <img style={{
                        height: 100,
                        width: "auto"
                    }}
                        src={currentUser?.photoURL ? currentUser?.photoURL : `https://avatars.dicebear.com/api/adventurer-neutral/${currentUser?.email}.svg`}
                        alt='user profile'
                    />
                </div>

                <p className='font-bold text-sm break-all mx-5 px-5 text-center'>{currentUser?.displayName ? currentUser?.displayName : currentUser?.email}</p>
                <p>Welcome!</p>
            </div>}

            {userRole === "admin" && <div className='flex flex-col justify-center items-center w-full gap-2 text-white '>
                <div className='rounded-full shadow overflow-hidden'>
                    <img style={{
                        height: 100,
                        width: "auto"
                    }}
                        src='https://api.lorem.space/image/face?w=150&h=150&hash=9D9539E7'
                        alt='user profile'
                    />
                </div>

                <p className='font-bold text-lg'>Welcome Admin!</p>
            </div>}

            <hr className='border-teal-500 self-center mt-4 w-10/12' />

            {userRole !== "admin" && <UserDashboardNavlinks />}
            {userRole === "admin" && <AdminDashboardNavlinks />}
        </div>
    )
}



export default Sidebar