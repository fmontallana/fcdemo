import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns/esm';
import React from 'react'
import { User, CalendarEvent, Tool, Message2 } from 'tabler-icons-react';
import { useBooking } from '../contexts/BookingContext';
import styles from '../style';

const BookingDetails = ({ onClose, uid, refetch, setLoading, closeModal }) => {

    const { getSingleBooking } = useBooking()
    const { data, loading, error } = useQuery(['singleBooking', uid], async () => await getSingleBooking(uid))


    return (
        <div className='flex justify-center items-center'>
            {loading && <h1>Fetching data..</h1>}
            {error && <h1>Error fetching data..</h1>}
            {
                data && <div className='flex flex-col w-full rounded-sm  overflow-hidden'>
                    <div className='flex px-2 py-2 gap-5 sm:gap-0'>
                        <div className='sm:flex-1'>
                            <p className='text-xs text-slate-500'>Reference No.</p>
                            <p className='text-xs lg:text-sm'>{data.refNo}</p>
                        </div>
                        <div className='sm:flex-1'>
                            <p className='text-xs text-slate-500'>Place On</p>
                            <p className='text-xs lg:text-sm'>{format(data.addedAt.toDate(), 'MM/dd/yyyy')}</p>
                        </div>
                        <div className='sm:flex-1'>
                            <p className='text-xs text-slate-500'>Status</p>
                            <p className='text-xs lg:text-sm capitalize'>{data.status}</p>
                        </div>
                    </div>
                    <div className='w-full border rounded-lg '>
                        <div className='border-b px-4 py-2'>
                            <div>
                                <p className='text-xs text-slate-500'>Service Type</p>
                                <p>{data.type}</p>
                            </div>
                            <div>
                                <p className='text-xs text-slate-500'>Preferred Date & Time</p>
                                <p>{format(new Date(data.date), "MMMM dd, yyyy")} - {data.time}</p>
                            </div>
                        </div>
                        <div className='border-b px-4 py-2'>

                            <div>
                                <p className='text-xs text-slate-500'>Name</p>
                                <p className='capitalize'>{data.name}</p>
                            </div>
                            <div>
                                <p className='text-xs text-slate-500'>Address</p>
                                <p className='capitalize'>{data.address}</p>
                            </div>
                            <div>
                                <p className='text-xs text-slate-500'>Email</p>
                                <p>{data.email}</p>
                            </div>
                            <div>
                                <p className='text-xs text-slate-500'>Contact Number</p>
                                <p>{data.phone}</p>
                            </div>
                        </div>

                        <div className='border-b px-4 py-2'>
                            <p className='text-xs text-slate-500'>Message</p>
                            <p>{data.message}</p>
                        </div>
                        {data.remarks && <div className=' px-4 py-2'>
                            <p className='text-xs text-slate-500'>Remarks</p>
                            <p>{data.remarks}</p>
                        </div>}
                    </div>
                </div>}
        </div>
    )
}

export default BookingDetails