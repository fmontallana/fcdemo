import React from 'react'
import styles from '../style'
import { X } from 'tabler-icons-react';
import { navLinks } from '../constants/index'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLogout } from '../hooks/useLogout';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MenuHome = ({ showMenu, toggleShowMenu }) => {

    const { isloggedIn } = useAuth()
    const [logout] = useLogout()
    const [active, setActive] = useLocalStorage("activeNavLink", "Home");
    const [userRole] = useLocalStorage("userRole", "");

    const navLinkClick = (nav) => {
        setActive(nav)
        toggleShowMenu(!showMenu)
    }


    return (
        <div className={`absolute z-50 lg:hidden flex flex-col ${styles.bg_niagara} h-screen w-8/12 min-w-8/12 inset-y-0 right-0`}>
            <div onClick={() => toggleShowMenu(!showMenu)} className='flex justify-end items-center p-5'>
                <X size={40} strokeWidth={2} color={'white'} />
            </div>
            <ul className={`flex flex-col gap-5 justify-center items-start px-10`}>
                {navLinks?.map((nav, index) => {
                    if (isloggedIn) {
                        if (nav.id === 5 || nav.id === 6) return
                    }
                    return <li key={nav.id} className={`truncate capitalize font-medium cursor-pointer text-[16px] ${active === nav.title ? `text-amber-200` : "text-white"} `} onClick={() => navLinkClick(nav.title)}>
                        <Link className={`hover:text-teal-900 font-notoSans`} to={`${nav.link}`}>{nav.title}</Link>
                    </li>
                }
                )}

                {isloggedIn &&
                    <>
                        <li
                            className={`truncate capitalize font-medium cursor-pointer text-[16px] ${active === "account" ? `text-amber-200` : "text-white"}`}
                            onClick={() => navLinkClick("account")}>
                            <Link className={`hover:text-teal-900 font-notoSans`} to={`/account`}>Account</Link>
                        </li>
                        <li className={`truncate font-medium cursor-pointer text-[16px] ${active === "logout" ? `${styles.text_tealBlue}` : "text-white"} `}
                            onClick={() => {
                                logout()
                                navLinkClick("logout")
                            }}>
                            <Link className={`hover:text-amber-200 font-notoSans`} to={'/'}>Logout</Link>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}

export default MenuHome