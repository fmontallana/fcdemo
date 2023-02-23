import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { CalendarComponent, StatCard, TodayBookingCard } from '../../components'
import { useBooking } from '../../contexts/BookingContext'
import { useUserContext } from '../../contexts/UserContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const AdminHome = () => {

    const { toggle, countDocsByStatus, getBookingsByDate } = useBooking()
    const { getUserById } = useUserContext()

    const [bookings, setBookings] = useLocalStorage("todayBookings", [])
    const [userInfo, setUserInfo] = useState([])
    const [counter, setCounter] = useLocalStorage("adminCounter", {
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0
    })

    useEffect(() => {
        countBookings()
        bookingsToday()
        getUser()
    }, [toggle])





    const countBookings = async () => {
        const pending = await countDocsByStatus("pending")
        const confirmed = await countDocsByStatus("confirmed")
        const completed = await countDocsByStatus("completed")
        const cancelled = await countDocsByStatus("cancelled")

        setCounter({
            pending,
            confirmed,
            completed,
            cancelled
        })
    }

    const bookingsToday = async () => {

        const data = await getBookingsByDate(format(new Date(), 'MM/dd/yyyy'))
        setBookings([...data])
    }

    const getUser = () => {
        bookings.forEach(item => {
            getUserById(item.userId)
                .then(x => {
                    if (x.uid === item.userId) {
                        setUserInfo([...userInfo, { uid: x.uid, photoURL: x.photo }])
                    }
                })
        })
    }


    return (
        <div className='flex flex-col-reverse lg:flex-row overflow-y-scroll lg:overflow-y-hidden '>
            <div className=' flex-1 h-100 overflow-y-scroll px-5'>
                <div className='mb-10 h-100'>
                    <div className='flex flex-col gap-5 w-full'>
                        <div className='font-bold capitalize text-slate-500 text-lg md:pt-5'>statistics</div>
                        <div className='flex flex-wrap gap-5 w-full'>
                            <StatCard title={"pending"} count={counter.pending} color={"yellow"} />
                            <StatCard title={"confirmed"} count={counter.confirmed} color={"green"} />
                            <StatCard title={"completed"} count={counter.completed} color={"blue"} />
                            <StatCard title={"cancelled"} count={counter.cancelled} color={"red"} />
                        </div>
                        <div className='font-bold capitalize text-slate-500 text-lg '>today's bookings</div>
                        <div className='flex gap-2 w-full flex-wrap'>
                            {
                                bookings.map((b) => {
                                    return <TodayBookingCard booking={b} />
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div className='bg-white w-11/12 lg:w-3/12 h-full mx-auto mb-5'>
                <CalendarComponent />
            </div>
        </div>
    )
}

export default AdminHome