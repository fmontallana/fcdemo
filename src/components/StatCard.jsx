import React from 'react'
import { CalendarTime, CalendarOff, CalendarPlus, CalendarEvent } from 'tabler-icons-react';


const StatCard = ({ color, title, count }) => {

    const styles = {
        gradient: color === "red" ? "from-red-400 to-red-600" :
            color === "green" ? "from-green-400 to-green-600" :
                color === "blue" ? "from-blue-400 to-blue-600" :
                    color === "yellow" ? "from-yellow-400 to-yellow-600" : null,
        textColor: color === "red" ? "text-red-700" :
            color === "green" ? "text-green-700" :
                color === "blue" ? "text-blue-700" :
                    color === "yellow" ? "text-yellow-700" : null,

    }

    return (
        <div className={`flex md:gap-2 justify-center items-center  bg-gradient-to-r ${styles.gradient} h-24 w-28 md:w-[160px] rounded-2xl px-5 shadow-lg`}>
            <div className={`hidden md:flex  justify-center items-center bg-${color}-500 ${styles.textColor}  rounded-xl h-10 w-10 `}>
                {title === "pending" && <CalendarTime size={30} strokeWidth={2} />}
                {title === "cancelled" && <CalendarOff size={30} strokeWidth={2} />}
                {title === "confirmed" && <CalendarPlus size={30} strokeWidth={2} />}
                {title === "completed" && <CalendarEvent size={30} strokeWidth={2} />}
            </div>
            <div className='flex-1 flex flex-col justify-between h-16 w-12'>
                <p className='text-slate-100 capitalize'>{title}</p>
                <p className={`text-3xl font-black ${styles.textColor}`}>{count}</p>
            </div>
        </div>
    )
}

export default StatCard