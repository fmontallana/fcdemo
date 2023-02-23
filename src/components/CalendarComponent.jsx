import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { useBooking } from '../contexts/BookingContext';
import styles from '../style';
import './calendar.css'
import { format } from 'date-fns';

const CalendarComponent = () => {

    const [value, onChange] = useState(new Date());
    const [booking, setBooking] = useState([])
    const { getBookingsByDate } = useBooking()


    const handleDateClick = async (date) => {
        const res = await getBookingsByDate(format(date, 'MM/dd/yyyy'))
        setBooking([...res])
    }

    return (
        <div className='h-full shadow-lg pb-5 lg:py-5'>
            <Calendar
                onClickDay={(date) => handleDateClick(date)}
                onChange={onChange}
                value={value}
                // minDate={new Date()}
                calendarType="US" />
            <hr className={`bg-gradient-to-r ${styles.gradientFromTo} h-1 w-8/12 mx-auto mb-10 mt-5`} />
            <div className=' px-8 h-full'>
                <p className='my-5 font-bold text-slate-500'>Selected Date Bookings</p>
                <div className='flex flex-col gap-2 max-h-96 text-white  overflow-y-scroll no-scrollbar rounded-md shadow-lg '>

                    {booking.map((item) => {
                        return <div className={`flex ${item.status === "pending" ? styles.bg_yellow :
                            item.status === "cancelled" ? styles.bg_red :
                                item.status === "completed" ? styles.bg_green :
                                    item.status === "confirmed" ? styles.bg_green : null} gap-5 h-32 rounded-md p-5 w-100 shadow-md`}>
                            {/* <div className=' rounded-full overflow-hidden h-10 w-10'>
                                <img className='h-10 w-10'
                                    src={item.photo}
                                    alt='user profile'
                                />
                            </div> */}
                            <div className='flex-1 w-100'>
                                <div className='flex justify-between'>
                                    <p className='flex-1 truncate'>{item.name}</p>
                                    <p className='text-sm'>{item.time}</p>
                                </div>
                                <hr className='border-t-2 border-t-white w-full my-2' />
                                <p>{item.type}</p>
                                <p className='text-sm'>{item.address}</p>
                            </div>
                        </div>
                    }
                    )}

                </div>
            </div>

        </div>
    )
}

export default CalendarComponent