import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { useAppSelector } from '../../store/hook'
import { selectUser } from '../../store/slicers/userSlice'
import { useNavigate, useParams } from 'react-router-dom'
import NavigationBar from '../navigation-bar'
import styles from './index.module.css'
import { BASE_URL } from '../../utils/url'

const Play: React.FC = function () {
    const { token, email, isVip } = useAppSelector(selectUser)
    const { name } = useParams()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const videoEle = useRef<HTMLVideoElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isVip) {
            setIsModalOpen(true)
        }
    }, [])
    const handleOk = () => {
        if(email) {
            navigate('/pay')
        } else {
            navigate('/login')
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        videoEle.current!.play() 
    }

    return (  
        <>
            <NavigationBar name={name}></NavigationBar>
            <video
                ref={videoEle}
                src={`${BASE_URL}/video?token=${token}&name=${name}.mp4`} 
                controls 
                className={styles['video']}
                controlsList="nodownload"  
                disablePictureInPicture
                
            />
            <Modal 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                okText={!email  ? '登录' : '开通vip'}
                cancelText={'试看10s'}
            >
                <div>
                    {!email ? '此视频为收费视频，请登录后充值vip观看'
                           : '您已登录，充值vip后立即观看完整版'
                    }
                </div>
            </Modal>
       </>
    )
}

export default Play
