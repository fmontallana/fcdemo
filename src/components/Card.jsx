import React, { useEffect, useState } from 'react'

const Card = (props) => {

    const [value, setValue] = useState({
        bgColor: "", color: ""
    })

    useEffect(() => {
        getGradientStyle()

    }, [])


    const style = {
        pending: "bg-gradient-to-b from-yellow-400 to-yellow-600",
        confirmed: "bg-gradient-to-b from-green-400 to-green-600",
        completed: "bg-gradient-to-b from-blue-400 to-blue-600",
        cancelled: "bg-gradient-to-b from-red-400 to-red-600",
        textPending: "text-yellow-500",
        textConfirmed: "text-green-500",
        textCompleted: "text-blue-500",
        textCancelled: "text-red-500",
    }

    const getGradientStyle = () => {
        switch (props.title) {
            case "pending":
                setValue({ color: style.textPending, bgColor: style.pending })
                break;
            case "confirmed":
                setValue({ color: style.textConfirmed, bgColor: style.confirmed })
                break;
            case "completed":
                setValue({ color: style.textCompleted, bgColor: style.completed })
                break;
            case "cancelled":
                setValue({ color: style.textCancelled, bgColor: style.cancelled })
                break;

        }
    }

    return (
        <button className={` h-full w-2/12 rounded-md shadow px-1 ${value.bgColor} `} onClick={props.onClick}>
            <div className={`flex justify-around items-center bg-white w-full h-full rounded-md ${value.color} font-bold capitalize hover:bg-transparent hover:text-white`}>
                <div>
                    {props.title}
                </div>
                <div className='text-lg font-black'>
                    {props.count}
                </div>

            </div>
        </button>
    )
}

export default Card