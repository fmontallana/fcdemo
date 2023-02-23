import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../style'

const Button = ({ children, url, height, text_size }) => {
    return (
        <button className={`${styles.bg_accent} ${height} flex items-center truncate text-white px-4 rounded-lg sm:rounded-full shadow-md font-sans font-semibold`}>
            <Link className={`${text_size}`} to={url}>{children}</Link>
        </button>
    )
}

export default Button