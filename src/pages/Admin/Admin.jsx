import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from '../../style'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Sidebar from '../../components/Sidebar'
import { Menu2, X } from 'tabler-icons-react'
import { useAuth } from '../../contexts/AuthContext'
import { useToggle } from '../../hooks/useToggle'



const Admin = () => {
    const clientAdmin = new QueryClient()
    const [userRole, setUserRole] = useLocalStorage("userRole", "")
    const { logout } = useAuth()
    const [show, toggle] = useToggle(true)


    return (
        <QueryClientProvider client={clientAdmin}>

            <div className='flex w-full h-screen overflow-y-hidden'>
                <div className={`${show ? "hidden" : "block"} ${!show ? "lg:hidden" : "lg:block"} h-full min-w-[256px] w-64  bg-gradient-to-b ${styles.gradientFromTo}`}>
                    <Sidebar toggle={toggle} show={show} />
                </div>
                <div className={`w-full min-w-[${window.innerWidth}px] flex flex-col flex-1 overflow-x-scroll overflow-y-hidden no-scrollbar `}>
                    <div className={`bg-gradient-to-r ${styles.gradientFromTo} min-h-[3rem] px-5 lg:px-10 flex justify-between items-center`}>
                        <button className='w-[25px] max-w-[25px]'>
                            {/* <Menu2 size={25} strokeWidth={2} color={'white'} onClick={() => toggle(!show)} /> */}
                            {show && < Menu2 size={25} strokeWidth={2} color={'white'} onClick={() => toggle(!show)} />}
                            {!show && <X size={25} strokeWidth={2} color={'white'} onClick={() => toggle(!show)} />}
                        </button>
                        {show && <><p className='text-white uppercase font-bold'> Admin Dashboard</p>
                            <button className={`hidden lg:block text-white hover:text-red-500 font-bold`} onClick={() => { logout(); localStorage.clear() }} >LOGOUT</button></>}
                    </div>
                    <div className='flex-1 overflow-x-hidden overflow-y-auto h-screen'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </QueryClientProvider >
    )
}

export default Admin