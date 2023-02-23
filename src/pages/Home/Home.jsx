import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components'
import Footer from '../Footer'

export default function Home() {

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
