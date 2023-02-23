import React, { useState } from 'react'
import styles from '../style'
import { navLinks } from '../constants'
import Button from './Button';
import branding from '../assets/frostcity-logo.png'
import { Phone, Mail, Menu2 } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MenuHome from './MenuHome';
import { useToggle } from '../hooks/useToggle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLogout } from '../hooks/useLogout';


function Navbar() {
    const [active, setActive] = useLocalStorage("activeNavLink", "Home");
    const [showMenu, toggleShowMenu] = useToggle(false)
    const { isloggedIn } = useAuth()
    const [userRole] = useLocalStorage('userRole', "")
    const [logout] = useLogout()

    return (
        <div className='w-full'>
            {showMenu && <MenuHome active={active} setActive={setActive} showMenu={showMenu} toggleShowMenu={toggleShowMenu} />}
            <div className={`hidden lg:display-block ${styles.paddingX} lg:flex lg:justify-between lg:items-center sm:h-[32px] ${styles.text_tealBlue} bg-white text-xs`}>
                <div className={` lg:flex lg:justify-start lg:space-x-6`}>
                    <div className='flex items-center space-x-2'>
                        <Mail size={16} strokeWidth={1.5} /><p>frostcityph@gmail.com</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Phone size={16} strokeWidth={1.5} /> <p>Globe +63 (995) 820 2413</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Phone size={16} strokeWidth={1.5} /> <p>Smart +63 (928) 552 0546</p>
                    </div>
                </div>
                <p className=' justify-self-end'>Mon - Sat , 8:00 AM - 5:00 PM</p>
            </div>
            <div className={` ${styles.paddingX} flex  items-center gap-5 ${styles.bg_niagara} h-16 sm:h-14 w-full `}>

                <div className='branding flex justify-between items-center space-x-3 lg:w-2/12 w-full  '>
                    <Link onClick={() => setActive("Home")} to={"/"}>
                        <div className=' flex  items-center '>
                            <div className='hidden lg:flex items-center w-[50px] -ml-5'>
                                <img src={branding} alt="brand-logo" />
                            </div>
                            <h6 className='font-black font-notoSans text-white text-[25px] sm:text-xl'>FROST<span className={`${styles.text_wildRice}`}>CITY</span></h6>
                        </div>
                    </Link>
                    <div onClick={() => toggleShowMenu(!showMenu)} className='lg:hidden flex justify-center items-center max-w-[25px]'>
                        <Menu2 size={25} strokeWidth={2} color={'white'} />
                    </div>

                </div>
                <ul className={` hidden  lg:flex lg:justify-around lg:items-center mx-16 flex-1  space-x-5 list-none  `}>
                    {navLinks?.map((nav, index) => {
                        if (isloggedIn) {
                            if (nav.id === 5 || nav.id === 6) return
                        }
                        return <li key={nav.id} className={`truncate capitalize font-medium cursor-pointer text-sm ${active === nav.title ? `text-amber-200` : "text-white"} `} onClick={() => setActive(nav.title)}>
                            <Link className={`hover:text-teal-900 font-notoSans`} to={`${nav.link}`}>{nav.title}</Link>
                        </li>
                    }
                    )}
                    {isloggedIn &&
                        <>
                            <li
                                className={`truncate capitalize font-medium cursor-pointer text-sm ${active === "account" ? `text-amber-200` : "text-white"}`}
                                onClick={() => setActive("account")}>
                                <Link className={`hover:text-teal-900 font-notoSans`} to={userRole === "admin" ? "/admin" : "/account"}>Account</Link>
                            </li>
                            <li
                                className={`truncate capitalize font-medium cursor-pointer text-sm ${active === "logout" ? `text-amber-200` : "text-white"}`}
                                onClick={() => { setActive("logout"); logout(); }}>
                                <Link className={`hover:text-teal-900 font-notoSans`} to={userRole === "admin" ? "/admin" : "/account"}>Logout</Link>
                            </li>
                        </>}
                </ul>
                <div className='hidden lg:flex lg:justify-end lg:w-2/12'>
                    <Button url="/login" height="h-10" text_size="text-xs">GET QUOTE NOW!</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar