import { Dialog, Transition } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { useBooking } from '../../contexts/BookingContext'
import { toast } from 'react-toastify'
import { BookingDetails } from '../../components'


export default function ViewDialog({ isOpen, toggle, action, refetch }) {

    const [loading, setLoading] = useState(false)
    const { message, setMessage, error, setError, selectedRow: uid } = useBooking()

    const title = action === "confirm" ? "Confirm Booking?" : action === "cancel" ? "Are you absolutely sure?" : action === "view" ? "Booking Details" : null


    function closeModal() {
        toggle(!isOpen)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-gray-900 mb-2"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    {action === "view" && <BookingDetails closeModal={closeModal} loading={loading} setLoading={setLoading} refetch={refetch} uid={uid} onClose={closeModal} />}
                                    {action === "confirm" && <ConfirmBooking closeModal={closeModal} loading={loading} setLoading={setLoading} refetch={refetch} uid={uid} onClose={closeModal} />}
                                    {action === "cancel" && <CancelBooking closeModal={closeModal} loading={loading} setLoading={setLoading} refetch={refetch} uid={uid} onClose={closeModal} />}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

// const BookingDetails = ({ onClose, uid, refetch, setLoading, closeModal }) => {

//     const { getSingleBooking } = useBooking()

//     const { data, loading, error } = useQuery(['singleBooking', uid], async () => await getSingleBooking(uid))

//     // async function handleClick() {
//     //     setLoading(true)
//     //     await cancelBooking(uid)
//     //     setLoading(false)
//     // }

//     return (
//         <div className='space-x-3'>
//             {loading && <h1>Fetching data..</h1>}
//             {error && <h1>Error fetching data..</h1>}
//             {
//                 data && <div>
//                     <p>Under Construction pa po ito.</p>
//                     <br />
//                     <h1>{data.name}</h1>
//                     <h1>{data.message}</h1>
//                     <h1>{data.address}</h1>
//                     <h1>{data.phone}</h1>
//                     <h1>{data.date}</h1>
//                 </div>
//             }

//         </div>
//     )
// }

const ConfirmBooking = ({ onClose, uid, refetch, loading, setLoading, closeModal }) => {

    const { updateBookingStatus, message, error } = useBooking()

    async function confirmBooking() {
        setLoading(true)
        await updateBookingStatus(uid, "confirmed")
        closeModal()
        setLoading(false)
        refetch()
    }

    return (
        <div className='space-y-3'>
            <p>This booking will be moved to a confirmed tab. Make sure you are done talking with the client.</p>
            <div className='space-x-3 flex justify-end'>
                <button
                    onClick={() => confirmBooking()}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    disabled={loading}>
                    {loading ? "Confirming..." : "Yes, confirm this booking"}
                </button>
                <button
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">No</button>
            </div>
        </div>
    )
}

const CancelBooking = ({ onClose, uid, refetch, loading, setLoading, closeModal }) => {

    const { cancelBooking, message, error } = useBooking()

    async function handleClick() {
        setLoading(true)
        const promise = new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await cancelBooking(uid))
                closeModal()
                setLoading(false)
                refetch()
            }, 2000);
        })

        toast.promise(promise, {
            pending: "Cancelling booking...",
            success: "Booking cancelled!",
            error: "Booking cancel failed"
        })
    }

    return (
        <div className='space-y-3'>
            <p>This action cannot be undone. This will permanently cancel the booking.</p>
            <div className='space-x-3 flex justify-end'>
                <button
                    onClick={() => handleClick()}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    disabled={loading}>
                    {loading ? "Updating..." : "Yes, cancel this booking."}
                </button>
                <button
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2">No</button>
            </div>
        </div>
    )
}

