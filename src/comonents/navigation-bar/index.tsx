import React from "react";
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
interface BarProps{
    name?: string
}
const NavigationBar: React.FC<BarProps> = function ({name}) {
    const navigate = useNavigate ()
    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className={styles['navigation-container']}>
            <span 
                className={`fa-angle-double-left ${styles['fa-angle-double-left']}`}
                onClick={goBack}
            >
            </span>
            {name && (
                <span className={styles['bar-name']}>
                    {name}
                </span>
            )}
            <span></span>
        </div>
    )
}
export default NavigationBar