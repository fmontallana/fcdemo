import React, { useEffect, useState } from 'react'
import { StatCard, Table, UpdateProfileModal } from '../../components'
import { useAuth } from '../../contexts/AuthContext'
import { useBooking } from '../../contexts/BookingContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useToggle } from '../../hooks/useToggle'
import styles from '../../style'
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../config/firebase'
import DataTable from 'react-data-table-component'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLogout } from '../../hooks/useLogout'



const HomeDashboard = () => {

    const [currentUser, loadingUser, errorUser] = useAuthState(auth)
    // const { currentUser } = useAuth()
    const userID = currentUser?.uid

    const [userInfo, loading, error] = useDocument(
        doc(db, 'users', userID),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );



    const user = currentUser && [
        {
            displayName: currentUser?.displayName,
            phoneNumber: currentUser?.phoneNumber ? currentUser?.phoneNumber : !loading ? userInfo?.data()?.phone : null,
            email: currentUser?.email,
            address: !loading ? userInfo?.data().address : null,
            photoURL: currentUser?.photoURL ? currentUser?.photoURL : `https://avatars.dicebear.com/api/adventurer-neutral/${currentUser?.email}.svg`
        }
    ]

    const { getAllBookingsByUserId, toggle, countDocsByIdAndStatus, getBookings } = useBooking()
    const [bookings, setBookings] = useLocalStorage("bookings", [])
    const [title, setTitle] = useState("")

    const [counter, setCounter] = useLocalStorage("dashboardCounter", {
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0
    })

    useEffect(() => {
        getAllBookings()
        countBookings()
    }, [toggle])

    const getAllBookings = async () => {
        const data = await getAllBookingsByUserId(userID)
        setBookings([...data])
    }

    // const handleTitle = async (t) => {
    //     setTitle(t)
    //     const data = await getBookings(userID, t)
    //     setBookings([...data])
    // }

    const countBookings = async () => {
        const pending = await countDocsByIdAndStatus(userID, "pending")
        const confirmed = await countDocsByIdAndStatus(userID, "confirmed")
        const completed = await countDocsByIdAndStatus(userID, "completed")
        const cancelled = await countDocsByIdAndStatus(userID, "cancelled")

        setCounter({
            pending,
            confirmed,
            completed,
            cancelled
        })
    }

    const columns = [
        {
            name: <h1 className='font-bold'>Status</h1>,
            selector: row => row.status,
            sortable: true,
            cell: row => <p className={`border-l-4 ${row.status === "cancelled" ? "border-red-400" :
                row.status === "pending" ? "border-yellow-400" :
                    row.status === "confirmed" ? "border-green-400" :
                        row.status === "completed" ? "border-blue-400" : null} h-full flex justify-center items-center pl-2 -ml-4 `}>{row.status}</p>

        },
        {
            name: <h1 className='font-bold'>Service Type</h1>,
            selector: row => row.type,
            sortable: true,
        },
        {
            name: <h1 className='font-bold'>Message</h1>,
            sortable: true,
            selector: row => row.message,
            cell: row => <p className="min-w-24 max-w-32 w-auto my-2 line-clamp-3 overflow-hidden ">{row.message}</p>
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
        }
    ]

    let [isOpen, setIsOpen] = useToggle(false)
    const [toUpdate, setToUpdate] = useState("")

    function handleUpdateSingleInfo(x) {
        openModal()
        setToUpdate(x)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }





    return (
        <div className='flex flex-col gap-5 container mx-auto  h-100 p-4'>
            <UpdateProfileModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                toUpdate={toUpdate} />
            <div className='font-bold capitalize text-slate-500 text-lg'>user info</div>
            <div className='flex flex-col lg:flex-row lg:justify-start lg:items-center gap-5 lg:gap-10 p-10 bg-white shadow-md rounded-lg '>
                {user.map(user => {
                    return (
                        <>
                            <div className='mx-auto lg:mx-0 rounded-full overflow-hidden shadow w-[100px] min-w-[100px]'>
                                <img src={user.photoURL} alt="user profile"
                                />
                            </div>
                            <div className='flex flex-col items-start'>
                                <p className='text-slate-400'>Full Name</p>
                                {currentUser.displayName ? <p className='text-lg mt-2'>{loading ? "Fetching data..." : currentUser?.displayName}</p>
                                    : <button className={`text-lg mt-2 cursor-pointer  ${styles.text_accent} hover:underline `}
                                        onClick={() => handleUpdateSingleInfo("name")} >Add your name</button>}
                            </div>
                            <div className='flex flex-col items-start'>
                                <p className='text-slate-400'>Contact Number</p>
                                {user.phoneNumber ? <p className='text-lg mt-2'>{loading ? "Fetching data..." : user?.phoneNumber}</p>
                                    : <button className={`text-lg mt-2 cursor-pointer  ${styles.text_accent} hover:underline `}
                                        onClick={() => handleUpdateSingleInfo("number")} >Add contact number</button>}
                            </div>
                            <div className='flex flex-col items-start'>
                                <p className='text-slate-400'>Email Address</p>
                                <p className='text-lg mt-2'>{loading ? "Fetching data..." : user?.email}</p>
                            </div>
                            <div className='flex flex-col items-start'>
                                <p className='text-slate-400'>Home Address</p>
                                {user.address ? <p className='text-lg mt-2'>{loading ? "Fetching data..." : user?.address}</p>
                                    : <button className={`text-lg mt-2 cursor-pointer  ${styles.text_accent} hover:underline `}
                                        onClick={() => handleUpdateSingleInfo("address")} >Add home address</button>}
                            </div>
                        </>
                    )
                })}

            </div>
            <div className='font-bold capitalize text-slate-500 text-lg'>statistics</div>

            <div className='flex flex-wrap gap-3 md:gap-5 bg-white w-full h-100 rounded-md shadow-md p-2 mb-2'>
                <StatCard title={"pending"} count={counter.pending} color={"yellow"} />
                <StatCard title={"confirmed"} count={counter.confirmed} color={"green"} />
                <StatCard title={"completed"} count={counter.completed} color={"blue"} />
                <StatCard title={"cancelled"} count={counter.cancelled} color={"red"} />

            </div>
            <div className='font-bold capitalize text-slate-500 text-lg'>all bookings</div>
            <div className='rounded-md shadow-lg overflow-hidden'>
                {/* <Table bookings={bookings} headers={headers} /> */}
                <DataTable pagination columns={columns} data={bookings} />
            </div>
        </div>
    )
}

export default HomeDashboard