import React, { useEffect, useState } from 'react'
import { useBooking } from '../contexts/BookingContext'
import { useUserContext } from '../contexts/UserContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TodayBookingCard = ({ booking, user }) => {

    const { getUserById } = useUserContext()
    const [photo, setPhoto] = useLocalStorage("cardPhoto", "")

    const styles = {
        border_l: booking.status === "pending" ? "border-l-yellow-400" :
            booking.status === "confirmed" ? "border-l-green-400" :
                booking.status === "completed" ? "border-l-blue-400" :
                    booking.status === "cancelled" ? "border-l-red-400" : null
    }

    const getPhoto = () => {
        getUserById(booking.userId)
            .then(x => setPhoto(x.photo))
    }

    useEffect(() => {
        getPhoto()

    }, [])


    return (
        <div className={`flex justify-center items-center gap-3 bg-white text-sm rounded-md p-4 w-72  shadow-md border-l-4 ${styles.border_l}`}>
            <div className='self-start rounded-full overflow-hidden h-10 w-10'>
                <img className='h-10 w-10'
                    src={photo}
                    alt='user profile'
                />
            </div>
            <div className='flex-1'>
                <div className='flex gap-1 justify-between'>
                    <p className='flex-1 truncate capitalize'>{booking.name}</p>
                    <p className='font-bold'>{booking.time}</p>
                </div>
                <hr className='border-t-1 border-t-teal-700 w-full my-1' />
                <p>{booking.type}</p>
                <small className='capitalize' >{booking.address}</small>
            </div>
        </div>
    )
}

export default TodayBookingCard