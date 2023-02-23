import { Dialog, Transition } from '@headlessui/react'
import { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { useToggle } from '../hooks/useToggle'
import styles from '../style'
import { useUpdateProfile, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase'
import { useUserContext } from '../contexts/UserContext'



export default function UpdateProfileModal({ isOpen, closeModal, openModal, title, toUpdate }) {

    const [input, setInput] = useState("")
    const [updateProfile, error] = useUpdateProfile(auth);
    const [user, loading, authError] = useAuthState(auth);
    const { updatePhoneNumber, updateAddress } = useUserContext()
    const [updating, setUpdating] = useState(false)


    function onClose() {
        closeModal()
        setInput("")
    }

    async function handleClick(e) {
        e.preventDefault()
        setUpdating(true)
        if (toUpdate === 'name') await updateName()
        if (toUpdate === 'number') await updatePhoneNumber(user.uid, input)
        if (toUpdate === 'address') await updateAddress(user.uid, input)
        setTimeout(() => {
            closeModal()
            setUpdating(false)
        }, 2000);
    }

    async function updateName() {
        try {
            const success = await updateProfile({ displayName: input });

        } catch (error) {
            alert("Error updating name:", error)
        }
    }


    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-sm font-medium leading-6 text-gray-900 uppercase mb-2"
                                    >
                                        {updating && <p>Updating...</p>}
                                    </Dialog.Title>
                                    <form onSubmit={handleClick} className={`flex w-full`}>
                                        <input
                                            className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded-l text-sm shadow focus:outline-none  flex-1' type={toUpdate === 'number' ? 'number' : 'text'}
                                            placeholder={toUpdate === 'name' ? 'Enter your name' : toUpdate === 'number' ? 'Enter contact number' : toUpdate === 'address' ? 'Enter home address' : null}
                                            onChange={(e) => setInput(e.target.value)} />
                                        <button className={`${updating ? 'bg-slate-700' : styles.bg_accent} text-white active:bg-gray-700 text-sm font-bold uppercase  py-3 rounded-r shadow min-w-24 hover:shadow-lg ${updating ? 'bg-slate-400' : 'hover:bg-red-600'} outline-none focus:outline-none w-1/6`}
                                            type="submit"
                                            disabled={updating}>Add</button>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
