import React from 'react'
import { Sidebar } from '../../components'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from '../../style'
import { useToggle } from '../../hooks/useToggle'
import { Menu2, X } from 'tabler-icons-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLogout } from '../../hooks/useLogout'
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { useEffect } from 'react'

const Dashboard = () => {

    const [logout] = useLogout()
    const [show, toggle] = useToggle(true)
    const client = new QueryClient()


    return (
        <QueryClientProvider client={client} >

            <div className='flex w-full h-screen overflow-y-hidden'>
                <div className={`${show ? "hidden" : "block"} ${!show ? "lg:hidden" : "lg:block"} h-full min-w-[256px] w-64  bg-gradient-to-b ${styles.gradientFromTo}`}>
                    <Sidebar toggle={toggle} show={show} />
                </div>
                <div className={`w-full min-w-[${window.innerWidth}px] flex flex-col flex-1 overflow-x-scroll overflow-y-hidden no-scrollbar `}>
                    <div className={`bg-gradient-to-r ${styles.gradientFromTo} min-h-[3rem] px-5 lg:px-10 flex justify-between items-center`}>
                        <button className='w-[25px] max-w-[25px]'>
                            {show && < Menu2 size={25} strokeWidth={2} color={'white'} onClick={() => toggle(!show)} />}
                            {!show && <X size={25} strokeWidth={2} color={'white'} onClick={() => toggle(!show)} />}

                        </button>
                        {show && <><p className='text-white uppercase font-bold'> User Dashboard</p>
                            <button className={`hidden lg:block text-white hover:text-red-500 font-bold`} onClick={() => { logout(); localStorage.clear() }} >LOGOUT</button></>}
                    </div>
                    <div className={`p-4 pb-8  md:p-8  mb-5 overflow-y-auto`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    )
}

export default Dashboard