import React from 'react';
import { Input } from 'antd'
import Icon from '@ant-design/icons';
import { passwordShowSvg, passwordHideSvg } from './svg-data';
import styles from './index.module.css';
const { Password } = Input;
interface PasswordProps {
    placeholder: string
}

export const WrapperPassword: React.FC<PasswordProps> = ({ placeholder, ...props}) => {
    return (
        <Password
            placeholder={placeholder}
            {...props}
            className={styles['login-input']} 
            iconRender={visible => (
                            visible ? <Icon component={passwordShowSvg}/> 
                                    : <Icon component={passwordHideSvg}/>
                        )}
        />
    )
}

