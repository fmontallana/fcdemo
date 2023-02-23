import React from 'react'
import styles from '../style'
import { useToggle } from '../hooks/useToggle'
import { MyModal } from '../components'


const Table = (props) => {

    let [isOpen, setIsOpen] = useToggle(false)

    const handleCancel = (id) => {
        props?.onCancelClick(id);
        props?.refetch(props.bookings[0].type, props.bookings[0].status)
        props?.setIsBookingDetailsShown(false)
        openModal()
    }

    const handleView = (id) => {
        props.onViewClick(id)
        props?.setIsBookingDetailsShown(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div className="flex flex-col rounded-md bg-white">
            <MyModal title={"Booking Cancelled"}
                details={"Selected booking cancelled successfully."}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal} />

            <div className="overflow-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-white border-b">
                                <tr>

                                    {props.headers.status && <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Status
                                    </th>}
                                    {props.headers.type && <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Service Type
                                    </th>}
                                    {props.headers.name && <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Name
                                    </th>}
                                    {props.headers.message && <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Message
                                    </th>}
                                    {props.headers.date && <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Preferred Date
                                    </th>}
                                    {props.headers.time && <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Preferred Time
                                    </th>}
                                    {props.headers.action && <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Action
                                    </th>}
                                </tr>
                            </thead>
                            {props?.bookings?.length === 0 && <tr className='text-center'>
                                <td colSpan={6} className="p-10 text-slate-400"> No data available.</td>
                            </tr>}
                            <tbody>
                                {props?.bookings?.length !== 0 &&
                                    props?.bookings.map(item => {
                                        return (
                                            <tr key={item.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                {props.headers.status && <td className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-l-4 
                                                ${item.status === "pending" ? "border-yellow-500" :
                                                        item.status === "completed" ? "border-blue-500" :
                                                            item.status === "cancelled" ? "border-red-500" :
                                                                item.status === "confirmed" ? "border-green-500" : null}`}>
                                                    {item.status}
                                                </td>}
                                                {props.headers.type && <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.type}
                                                </td>}
                                                {props.headers.name && <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.name}
                                                </td>}

                                                {props.headers.message && <td className="text-sm text-gray-900 font-light px-6 py-4  max-w-xl">
                                                    {item.message}
                                                </td>}
                                                {props.headers.date && <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.date}
                                                </td>}
                                                {props.headers.time && <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.time}
                                                </td>}
                                                {props.headers.action && <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap space-x-2">
                                                    {props.view && <button className={`${styles.btnSmall} bg-teal-700 hover:bg-teal-800`}
                                                        onClick={() => handleView(item.id)}>View</button>}
                                                    {props.cancel && <button className={`${styles.btnSmall}   hover:bg-red-600`}
                                                        onClick={() => handleCancel(item.id)}>Cancel</button>}
                                                </td>}
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table