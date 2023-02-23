import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ForgotPassword, PageNotFound, Services, VerifyAccount } from './components'
import { useAuth } from './contexts/AuthContext'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Admin, Contact, Home, Login, Signup } from './pages'
import About from './pages/About'
import { AdminBookings, AdminHome, AdminLogin } from './pages/Admin'
import { Dashboard, Settings, HomeDashboard, NewBooking, Bookings } from './pages/Dashboard'
import { HomeContent } from './pages/Home'
import Pricing from './pages/Pricing'
import styles from './style'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './config/firebase'
import { SpinnerCircular } from 'spinners-react'

const App = () => {

  const { isloggedIn } = useAuth()
  const [currentUser, loading, error] = useAuthState(auth)
  const [userRole, setUserRole] = useLocalStorage("userRole", "")

  if (loading) {
    return <div className='flex flex-col justify-center items-center gap-2 h-screen'>
      <SpinnerCircular size={60} thickness={180} speed={150} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
      <p>Please wait</p>
    </div>
  }

  return (
    <div className={`bg-primary w-full overflow-hidden ${styles.text_casal} `}>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light" />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<HomeContent />} />
          <Route path='login' element={!isloggedIn ? <Login /> : <Navigate to={'/account'} replace />} />
          <Route path='signup' element={!isloggedIn ? <Signup /> : <Navigate to={'/account'} replace />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='services' element={<Services />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          {isloggedIn ? <Route path='onboarding' element={currentUser?.emailVerified ? <Navigate to={'/account'} replace /> : <VerifyAccount />} /> :
            <Route path='onboarding' element={<Navigate to={'/'} replace />} />}
          <Route path='*' element={
            <div className='h-full'>
              <PageNotFound />
            </div>} />
        </Route>
        <Route path='/account' element={
          !currentUser ? <Navigate to={'/login'} replace /> :
            currentUser?.emailVerified ? <Dashboard />
              : !currentUser?.emailVerified ? <Navigate to={'/onboarding'} replace />
                : null}>
          <Route index element={<HomeDashboard />} />
          <Route path='book' element={<NewBooking />} />
          <Route path='book/pending' element={<Bookings />} />
          <Route path='book/confirmed' element={<Bookings />} />
          <Route path='book/completed' element={<Bookings />} />
          <Route path='book/cancelled' element={<Bookings />} />
          <Route path='settings' element={<Settings />} />
        </Route>

        {!isloggedIn && <Route path='/admin' element={userRole !== "admin" ? <AdminLogin /> : <Admin />}>
          <Route index element={<AdminHome />} />
          <Route path='confirmed' element={<AdminBookings />} />
          <Route path='pending' element={<AdminBookings />} />
          <Route path='completed' element={<AdminBookings />} />
          <Route path='cancelled' element={<AdminBookings />} />
        </Route>}

        <Route path='*' element={<div className='h-screen'>
          <Home>
            <PageNotFound />
          </Home>
        </div>} />
      </Routes>
    </div>
  )
}

export default App