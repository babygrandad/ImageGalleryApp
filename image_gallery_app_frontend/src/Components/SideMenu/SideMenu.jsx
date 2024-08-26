import React from 'react';
import { useLocation } from 'react-router-dom';
import SideMenuStyles from './SideMenu.module.css';

function SideMenu() {
    const location = useLocation();

    return (
        <aside className={`${SideMenuStyles.sideMenu} ${SideMenuStyles.hidden}`}>
            <div className={SideMenuStyles.logoContainer}>
                <a href="/home" className={`${SideMenuStyles.topLogoLink} ${SideMenuStyles.sideMenuLinks}`}>
                    <picture>
                        <source srcSet='https://i.ibb.co/vwsskQK/Logo-1-white.gif' media='(max-width: 720px)'/>
                        <img src="https://i.ibb.co/3Mr2PNB/Logo-1-white.png" alt="Logo-1-white" className={`${SideMenuStyles.topLogoImage}`} />
                    </picture>
                </a>
            </div>
            <div className={SideMenuStyles.menuContainer}>
                <ul className={SideMenuStyles.sideMenuList}>
                    <li className={`${SideMenuStyles.sideMenuListItem} ${location.pathname === '/home' ? SideMenuStyles.active : ''}`}>
                        <a href='/home' className={SideMenuStyles.sideMenuLinks}>
                            <span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>home</span>
                            <span className={`${SideMenuStyles.pathnameText}`}>Home</span>
                        </a>
                    </li>
                    <li className={`${SideMenuStyles.sideMenuListItem} ${location.pathname === '/upload' ? SideMenuStyles.active : ''}`}>
                        <a href='/upload' className={SideMenuStyles.sideMenuLinks}>
                            <span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>add_a_photo</span>
                            <span className={`${SideMenuStyles.pathnameText}`}>Image Upload</span>
                        </a>
                    </li>
                    <li className={`${SideMenuStyles.sideMenuListItem} ${location.pathname === '/mylibrary' ? SideMenuStyles.active : ''}`}>
                        <a href='/mylibrary' className={SideMenuStyles.sideMenuLinks}>
                        <span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>person</span>
                        <span className={`${SideMenuStyles.pathnameText}`}>My Library</span>
                            
                        </a>
                    </li>
                </ul>
            </div>
            <div className={SideMenuStyles.menuLogoutContainer}>
                <a href="/" className={`${SideMenuStyles.menuLogoutLink} ${SideMenuStyles.sideMenuLinks}`}>
                    <span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>logout</span>
                    <span className={`${SideMenuStyles.pathnameText}`}>Logout</span>
                </a>
            </div>
        </aside>
    );
}

export default SideMenu;
