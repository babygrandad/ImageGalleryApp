import React from 'react';
import { useLocation } from 'react-router-dom';
import SideMenuStyles from './SideMenu.module.css';

function SideMenu() {
    const location = useLocation();

    return (
        <aside className={SideMenuStyles.sideMenu}>
            <div className={SideMenuStyles.logoContainer}>
                <a href="/home" className={`${SideMenuStyles.topLogoLink} ${SideMenuStyles.sideMenuLinks}`}>
                    <img src="https://i.ibb.co/3Mr2PNB/Logo-1-white.png" alt="Logo-1-white" className={`${SideMenuStyles.topLogoImage}`} />
                </a>
            </div>
            <div className={SideMenuStyles.menuContainer}>
                <ul className={SideMenuStyles.sideMenuList}>
                    <li className={`${SideMenuStyles.sideMenuListItem} ${location.pathname === '/home' ? SideMenuStyles.active : ''}`}>
                        <a href='/home' className={SideMenuStyles.sideMenuLinks}>
                            <span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>home</span>Home
                        </a>
                    </li>
                    <li className={`${SideMenuStyles.sideMenuListItem} ${location.pathname === '/upload' ? SideMenuStyles.active : ''}`}>
                        <a href='/upload' className={SideMenuStyles.sideMenuLinks}>
                            <span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>add_a_photo</span>Image Upload
                        </a>
                    </li>
                    <li className={`${SideMenuStyles.sideMenuListItem} ${location.pathname === '/mylibrary' ? SideMenuStyles.active : ''}`}>
                        <a href='/mylibrary' className={SideMenuStyles.sideMenuLinks}>
                            <span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>person</span>My Library
                        </a>
                    </li>
                </ul>
            </div>
            <div className={SideMenuStyles.menuLogoutContainer}>
                <a href="/" className={`${SideMenuStyles.menuLogoutLink} ${SideMenuStyles.sideMenuLinks}`}>
                    <span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>logout</span> Logout
                </a>
            </div>
        </aside>
    );
}

export default SideMenu;
