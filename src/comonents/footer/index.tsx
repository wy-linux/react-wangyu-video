import React from 'react';
import { useAppSelector } from "../../store/hook";
import { selectUser } from "../../store/slicers/userSlice"
import { NavLink } from "react-router-dom";
import styles from './index.module.css'

const Footer: React.FC = function () {
    const { token } = useAppSelector(selectUser)

    return (
        <div className={styles['footer-container']}>
            <footer className={styles['footer']}>
                <NavLink to='/video'><i className="btn fn-shouye"></i>点播</NavLink>
                <NavLink to='/live'><i className="fa fa-youtube-play"></i>直播</NavLink>
                <NavLink to='/tool'><i className="fa fa-bug"></i>工具</NavLink>
                <NavLink to={token ? '/profile' : '/login'}><i className="btn fn-wode"></i>我的</NavLink>
            </footer>
        </div>
    )
}

export default Footer
