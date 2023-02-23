import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const UserInfo = () => {
    const { currentUser } = useAuth()

    return (
        <div>
            {JSON.stringify(currentUser)}
        </div>
    )
}

export default UserInfo