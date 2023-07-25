import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { getVideoList } from '../../api/video'
import { Autoplay } from 'swiper'
import Header from '../../comonents/header'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BASE_URL } from '../../utils/url'
import 'swiper/css';
import styles from './index.module.css'

const Video: React.FC = function () {
    const [videoList, setVideoList] = useState<string[]>([])
    //发送请求
    useEffect(() => {
        getVideoList()
            .then(list => {
                setVideoList(list)
            })
            .catch(() => {})
    }, []) 
    //处理滚动
    useEffect(() => {
        let scrollY: number = +(localStorage.getItem('scrollY') ?? 0)
        setTimeout(() => {
            window.scrollTo({
                top: scrollY
            })
        }, 100)
        const handleScroll = () => {
            scrollY = window.scrollY
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            localStorage.setItem('scrollY', `${scrollY}`)
        }
    }, [])

    return (
        <div className="Home">
            <Header></Header>
            <div className={styles['swiper-container']}>
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1}
                    spaceBetween={0}
                    autoplay={{
                      delay: 1000
                    }}
                >
                    {videoList.map((name: string, index) => ( 
                        <SwiperSlide key={index}>
                            <Link to={`/play/${name}`}>
                                <img src={`${BASE_URL}/img/${name}.jpg`} alt="" />
                            </Link>
                        </SwiperSlide>  
                    ))}
                </Swiper>
            </div>
            <ul className={styles['container-row']}>
                {videoList.map((name: string, index) => (
                    <li key={index}>
                        <Link to={`/play/${name}`}>
                            <div className={styles['img-wrapper']}>
                                <img src={`${BASE_URL}/img/${name}.jpg`} alt="" />
                                <title>{name}</title>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Video
