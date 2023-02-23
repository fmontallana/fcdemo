import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useBooking } from '../../contexts/BookingContext'
import styles from '../../style'
import { serverTimestamp } from 'firebase/firestore'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { MyModal } from '../../components'
import { useToggle } from '../../hooks/useToggle'
import cryptoRandomString from 'crypto-random-string';
import { toast } from 'react-toastify'
import { SpinnerCircular, SpinnerDotted } from 'spinners-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'


const NewBooking = () => {

    let [isOpen, setIsOpen] = useToggle(false)
    const [currentUser] = useAuthState(auth)
    // const { currentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const { addBooking, toggleFunction, getBookingsByDate } = useBooking()
    const [timeSlots, setTimeSlots] = useState([
        {
            time: "08:00 AM",
            available: true
        },
        {
            time: "10:00 AM",
            available: true
        },
        {
            time: "01:00 PM",
            available: true
        },
        {
            time: "03:00 PM",
            available: true
        }
    ])

    const [inputs, setInputs] = useState({
        userId: currentUser.uid,
        refNo: cryptoRandomString({ length: 10, type: 'alphanumeric' }),
        name: "",
        email: "",
        phone: "",
        message: "",
        address: "",
        type: "",
        date: "",
        time: "",
        status: "pending",
        addedAt: serverTimestamp()
    })



    const handleDatePick = async (date) => {
        if (date === "") return
        const slots = [
            {
                time: "08:00 AM",
                available: true
            },
            {
                time: "10:00 AM",
                available: true
            },
            {
                time: "01:00 PM",
                available: true
            },
            {
                time: "03:00 PM",
                available: true
            }]

        const res = await getBookingsByDate(date)
        res.map((x => {
            if (x.status === "pending") {
                timeSlots.forEach((t, index) => {
                    if (t.time === x.time) {
                        slots[index].time = x.time
                        slots[index].available = false
                    }
                })
            } else {

            }
        }))

        setTimeSlots(slots)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (inputs.time === "") alert("Please select available time.")

        setLoading(true)

        const promise = new Promise(async (resolve, reject) => {
            try {
                setTimeout(async () => {
                    resolve(await addBooking(inputs))
                    setLoading(false)
                }, 2000);
            } catch (error) {
                reject(error)
            }
        })

        toast.promise(promise, {
            pending: "Adding booking...",
            success: "Booking added!",
            error: "Booking failed"
        })

        setInputs({
            userId: currentUser.uid,
            refNo: cryptoRandomString({ length: 10, type: 'alphanumeric' }),
            name: "",
            email: "",
            phone: "",
            message: "",
            address: "",
            type: "",
            date: "",
            time: "",
            status: "pending",
            addedAt: serverTimestamp()
        })

        setTimeSlots([
            {
                time: "08:00 AM",
                available: true
            },
            {
                time: "10:00 AM",
                available: true
            },
            {
                time: "01:00 PM",
                available: true
            },
            {
                time: "03:00 PM",
                available: true
            }])
        // toggleFunction()
        // openModal()
    }


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (

        <div className='px-2 mx-auto '>
            <MyModal title={"Booking Successful!"}
                details={""}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal} />

            <div className='font-bold capitalize text-slate-500 text-lg mb-3'>Book An Appointment</div>
            <div className='font-bold capitalize text-slate-500 text-sm italic'>Fill out this form to schedule a reservation.</div>
            <br />
            <div className="flex flex-col bg-white mb-10 p-5 rounded-lg shadow-lg">
                <form className='flex flex-col sm:flex-row gap-10 w-full' onSubmit={handleSubmit} >
                    <div className='w-full'>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Full Name
                            </label>
                            <input
                                required
                                type="text"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Full Name"
                                style={{ transition: "all .15s ease" }}
                                name='name'
                                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                value={inputs.name}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Email
                            </label>
                            <input
                                required
                                type="email"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Email"
                                style={{ transition: "all .15s ease" }}
                                name='email'
                                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                value={inputs.email}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Phone Number
                            </label>
                            <input
                                required
                                type="number"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Phone Number"
                                style={{ transition: "all .15s ease" }}
                                name='phone'
                                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                value={inputs.phone}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Message
                            </label>
                            <textarea
                                required
                                rows={6}
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Type your message or additional instruction here (e.g. quantity of aircon, type of aircon, brand of aircon, inquiries for repair or cleaning, etc.)"
                                style={{ transition: "all .15s ease" }}
                                name='message'
                                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                value={inputs.message}
                            />
                        </div>

                    </div>
                    <div className='w-full'>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Address
                            </label>
                            <input
                                required
                                type="text"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Street, District, Barangay, Postal Code, City / Municipality, Province"
                                style={{ transition: "all .15s ease" }}
                                name='address'
                                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                value={inputs.address}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Service type
                            </label>
                            <select
                                required
                                type="text"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Choose service type"
                                style={{ transition: "all .15s ease" }}
                                name='type'
                                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                value={inputs.type}
                            >
                                <option value="" disabled={true}>Choose a service type</option>
                                <option value="Aircon Installation">Aircon Installation</option>
                                <option value="Cleaning / Maintenance">Cleaning / Maintenance</option>
                                <option value="Check-up / Repair">Check-up / Repair</option>
                            </select>
                        </div>
                        <div className="relative w-full mb-3 mt-5 py-5">
                            <p>When do you want us to come? </p>
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Select Preferred Date
                            </label>
                            {/* <input
                                type="date"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                style={{ transition: "all .15s ease" }}
                                name='date'
                                onChange={(e) => {
                                    setInputs({ ...inputs, [e.target.name]: format(new Date(e.target.value), 'MM/dd/yyyy') });
                                    getSlots(e.target.value)
                                    handleDatePick(format(new Date(e.target.value), 'MM/dd/yyyy'))
                                }}
                                value={inputs.date !== "" ? format(new Date(inputs.date), 'yyyy-MM-dd') : null}
                            /> */}
                            <DatePicker
                                required
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholderText={'Select preferred date'}
                                minDate={new Date()}
                                selected={inputs.date !== "" ? new Date(inputs.date) : null}
                                onSelect={(date) => handleDatePick(format(new Date(date), 'MM/dd/yyyy'))}
                                onChange={(date) => {
                                    setInputs({ ...inputs, ['date']: format(new Date(date), 'MM/dd/yyyy'), ['time']: "" })
                                }} />

                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Select Preferred Time
                            </label>
                            <select
                                required
                                type="text"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Choose service type"
                                style={{ transition: "all .15s ease" }}
                                name='time'
                                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                value={inputs.time}
                                defaultValue={timeSlots[0].time}
                            >
                                <option value={""} >Available time</option>

                                {
                                    inputs.date !== "" ? timeSlots.map(time => {
                                        if (time.time === "08:00 AM") return <option key={time.time} disabled={!time.available} value={time.time}>{time.time} {time.available ? "Available" : "Already Booked"}
                                        </option>
                                    }) : null
                                }
                                {
                                    inputs.date !== "" ? timeSlots.map(time => {
                                        if (time.time === "10:00 AM") return <option key={time.time} disabled={!time.available} value={time.time}>{time.time} {time.available ? "Available" : "Already Booked"}
                                        </option>
                                    }) : null
                                }
                                {
                                    inputs.date !== "" ? timeSlots.map(time => {
                                        if (time.time === "01:00 PM") return <option key={time.time} disabled={!time.available} value={time.time}>{time.time} {time.available ? "Available" : "Already Booked"}
                                        </option>
                                    }) : null
                                }
                                {
                                    inputs.date !== "" ? timeSlots.map(time => {
                                        if (time.time === "03:00 PM") return <option key={time.time} disabled={!time.available} value={time.time}>{time.time} {time.available ? "Available" : "Already Booked"}
                                        </option>
                                    }) : null
                                }

                            </select>
                        </div>
                        <div className="relative w-full mb-3 italic">
                            <small>All fields are required. </small> <br />
                            <small>Note: One of our admin will contact you to discuss and confirm your reservation. </small>
                        </div>
                        <div className="text-center mt-6">
                            <button
                                className={`${styles.bg_accent} flex justify-center items-center gap-3 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 w-full`}
                                type="submit"
                                style={{ transition: "all .15s ease" }}
                                disabled={isOpen}
                            >
                                {!loading ? "Submit" : <>
                                    <p>submitting</p>
                                    <SpinnerCircular size={20} thickness={180} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                                </>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* <button onClick={fakeData}>fake data upload</button> */}
        </div>

    )
}

export default NewBooking