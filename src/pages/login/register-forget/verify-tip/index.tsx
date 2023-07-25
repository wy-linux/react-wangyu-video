import React from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './index.module.css';
interface TipProps {
    errorState: boolean;
    children?: React.ReactNode  
}
const VerificationTip: React.FC<TipProps> = ({ errorState, children }) => {
    return (
        <span
            className={styles['error-info-container']}
            style={{color: errorState ? '#f31e2c' : '#04C658'}}
        >
            {
               errorState ?  <CloseOutlined className={styles['error-icon']} style={{color: '#f31e2c'}} />
                          :  <CheckOutlined className={styles['error-icon']} style={{color: '#04C658'}} />
            }
            <span className={styles['error-text']}>
                {children}
            </span>
        </span>
    )
}

export default VerificationTip;
