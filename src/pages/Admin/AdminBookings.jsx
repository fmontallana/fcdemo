import React from 'react'
import { useQuery } from '@tanstack/react-query'
import AdminTable from './AdminTable'
import { useBooking } from '../../contexts/BookingContext'
import { useState } from 'react'
import styles from '../../style'
import ActionButton from './ActionButton'
import { Eye, Check, X } from 'tabler-icons-react';
import { useToggle } from '../../hooks/useToggle'
import ViewDialog from './ViewDialog'

const AdminBookings = () => {
    const [showDialog, toggle] = useToggle(false)
    const [actionClick, setActionClick] = useState("")
    const [active, setActive] = useState(1)
    const [type, setType] = useState("Aircon Installation")
    const { getAllBookingsByType, selectedRow, setSelectedRow, message } = useBooking()
    const { data, refetch } = useQuery(['bookings', type, window.location.href.split('admin/')[1]], async () => {
        const res = await getAllBookingsByType(type, window.location.href.split('admin/')[1])
        return res
    })

    const SERVICE_TYPE = [
        "Cleaning / Maintenance", "Aircon Installation", "Check-up / Repair"
    ]

    const handleClick = (e, active) => {
        setType(e.target.name)
        setActive(active)
    }

    const columns = [
        {
            name: <h1 className='font-bold'>Reference No.</h1>,
            selector: row => row.refNo,
        },
        {
            name: <h1 className='font-bold'>Service Type</h1>,
            selector: row => row.type,
        },
        {
            name: <h1 className='font-bold'>Name</h1>,
            sortable: true,
            selector: row => row.name,
        },
        {
            name: <h1 className='font-bold'>Preferred Date</h1>,
            sortable: true,
            selector: row => row.date,
        },
        {
            name: <h1 className='font-bold'>Preferred Time</h1>,
            sortable: true,
            selector: row => row.time,
        },
        {
            name: <h1 className='font-bold'>Action</h1>,
            cell: row => <Action row={row} />
        },
    ]


    const onActionClick = (action, uid) => {
        if (action === "view") {
            toggle(!showDialog)
            setActionClick("view")
        }
        if (action === "confirm") {
            toggle(!showDialog)
            setActionClick("confirm")
        }
        if (action === "cancel") {
            toggle(!showDialog)
            setActionClick("cancel")
        }
        if (action === "complete") {
            toggle(!showDialog)
            setActionClick("complete")
        }

        setSelectedRow(uid)
    }

    //buttons sa action column ng table
    const Action = ({ row }) => {
        return (
            <div className='flex gap-2'>
                <button onClick={() => onActionClick("view", row.id)}>
                    <div className='flex justify-center items-center bg-blue-600 w-6 h-6 rounded-lg'>
                        <Eye className='hover:stroke-blue-200' size={20} strokeWidth={2} color={'white'} />
                    </div>
                </button>
                {window.location.href.split('admin/')[1] === "pending" &&
                    <button onClick={() => onActionClick("confirm", row.id)}>
                        <div className='flex justify-center items-center bg-green-600 w-6 h-6 rounded-lg'>
                            <Check className='hover:stroke-green-200' size={20} strokeWidth={2} color={'white'} />
                        </div>
                    </button>}
                {window.location.href.split('admin/')[1] === "confirmed" &&
                    <button onClick={() => onActionClick("complete", row.id)}>
                        <div className='flex justify-center items-center bg-green-600 w-6 h-6 rounded-lg'>
                            <Check className='hover:stroke-green-200' size={20} strokeWidth={2} color={'white'} />
                        </div>
                    </button>}
                {window.location.href.split('admin/')[1] !== "cancelled" && window.location.href.split('admin/')[1] !== "completed" &&
                    <button onClick={() => onActionClick("cancel", row.id)}>
                        <div className='flex justify-center items-center bg-red-600 w-6 h-6 rounded-lg'>
                            <X className='hover:stroke-red-200' size={20} strokeWidth={2} color={'white'} />
                        </div>
                    </button>}
            </div>
        )
    }

    return (
        <div className=' px-5 pt-5 h-full'>
            <ViewDialog refetch={refetch} isOpen={showDialog} toggle={toggle} action={actionClick} />
            <h1 className='font-bold capitalize text-slate-500 text-lg '>all {window.location.href.split('admin/')[1]} bookings</h1>
            <div className='bg-white flex justify-evenly rounded-t-lg overflow-hidden w-full mt-2 text-xs sm:text-sm '>
                {SERVICE_TYPE.map((x, index) => <button key={index} className={`bg-white w-full h-12 px-5  shadow-xl ${active === index + 1 && `text-white bg-gradient-to-b ${styles.gradientFromTo}`} `} name={x} onClick={(e) => handleClick(e, index + 1)} >{x}</button>)}
            </div>
            <div className='rounded-b-lg shadow-lg overflow-hidden'>
                <AdminTable columns={columns} data={data} />
            </div>
        </div>
    )
}

export default AdminBookings