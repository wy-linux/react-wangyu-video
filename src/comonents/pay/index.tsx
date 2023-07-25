import React from 'react'
import NavigationBar from '../navigation-bar'
import styles from './index.module.css'
import payImg from '../../assets/pay.png'

const Pay: React.FC = function () {
    return (
        <>
            <NavigationBar></NavigationBar>
            <div className={styles['pay-container']}>
                <img src={payImg} alt="" />
            </div>
        </>
    )
}
export default Pay