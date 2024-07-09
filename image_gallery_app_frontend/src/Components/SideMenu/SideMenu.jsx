import React from 'react'
import SideMenuStyles from './SideMenu.module.css'


function SideMenu() {
	return (
		<aside className={SideMenuStyles.sideMenu}>
			<div className={SideMenuStyles.logoContainer}>
				<a href="/feed" className={`${SideMenuStyles.topLogoLink} ${SideMenuStyles.sideMenuLinks}`}>Logo</a>
			</div>
			<div className={SideMenuStyles.menuContainer}>
				<ul className={SideMenuStyles.sideMenuList}>
					<li className={`${SideMenuStyles.sideMenuListItem} ${SideMenuStyles.active}`/*remeber to change this "${SideMenuStyles.active}" when coming to hooks and use states Angela will show you*/}>
						<a className={SideMenuStyles.sideMenuLinks}>
							<span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>home</span>Home
						</a>
					</li>
					<li className={SideMenuStyles.sideMenuListItem}>
						<a className={SideMenuStyles.sideMenuLinks}>
							<span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>add_a_photo</span>Image Upload
						</a>
					</li>
					<li className={SideMenuStyles.sideMenuListItem}>
						<a className={SideMenuStyles.sideMenuLinks}>
							<span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>person</span>Profile
						</a>
					</li>
				</ul>
			</div>
			<div className={SideMenuStyles.menuLogoutContainer}>

				<a href="/logout" className={`${SideMenuStyles.menuLogoutLink} ${SideMenuStyles.sideMenuLinks}`}>
					<span className={`${SideMenuStyles.sideMenuIcons} material-symbols-outlined`}>logout</span> Logout
				</a>
			</div>
		</aside>
	)
}

export default SideMenu