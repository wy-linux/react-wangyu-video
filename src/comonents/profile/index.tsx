import React from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from 'antd'
import { useAppSelector, useAppDispatch} from '../../store/hook'
import { selectUser, logoutAsync } from '../../store/slicers/userSlice'
import styles from './index.module.css'
import logo from '../../assets/logo-black.png'

const Profile: React.FC = function () {   
    const { email, isVip, coinCount } = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    
    const signOut =  () => {
        dispatch(logoutAsync())
    }
    return email ? (
        <>
            <div className={styles['profile-box']}>
                <div className={styles['profile-img-wrapper']}>
                    <img src={logo} alt="" />
                </div>
                <div className={styles['profile-info']}>
                    <span className={styles['profile-email']}>{'WangYu-Video用户：  ' + email}</span>
                    <div className={styles['profile-vip-coin']}>
                        <span >{'金币：  ' + coinCount}元</span>
                        <span>
                            Vip：{isVip ? '您已经是vip' : '您还不是vip'}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles['sign-out']}>
                <Button  type="primary" onClick={signOut}>退出登录</Button>
            </div>
        </>
    ) : (
        <Navigate to='/login' />
    )
}
export default Profile