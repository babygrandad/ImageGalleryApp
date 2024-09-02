import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import TopbarStyle from './Topbar.module.css'

function TopBar({ breadcrum, user }) { // Accept 'breadcrum' and 'user' as props

	const [openDropdown, setOpenDropdown] = useState(false)
	const location = useLocation();

	const handleDropdown = () =>{
		setOpenDropdown(!openDropdown)
	}

	// Define breadcrumbs for navigation
	const breadcrumbs = [
		{ path: "/home", crum: "Home" },
		{ path: "/upload", crum: "Upload Page" },
		{ path: "/mylibrary", crum: "My Library" }
	];

	// Get the breadcrumb based on the current location path
	const currentBreadcrumb = breadcrumbs.find(b => b.path === location.pathname)?.crum || breadcrum;

	return (
		<div className={TopbarStyle.container}>
			<div className={TopbarStyle.currentPage}>
				<span>{currentBreadcrumb}</span> {/* Display the current breadcrumb */}
			</div>
			<div className={TopbarStyle.topBarProfileContainer}>
				{/* Display user's full name, fall back to 'Guest' if not available */}
				<span>{user?.fullName || 'Guest'}</span> 
				<span className={`${TopbarStyle.dropdownIcon} material-symbols-outlined`} onClick={handleDropdown}>keyboard_arrow_down</span>

				{openDropdown && (
					<ul className={TopbarStyle.dropdownMenu}>
					<li className={TopbarStyle.dropdownLink} onClick={() =>{handleDropdown(false)}}>{user?.email}</li>
					<li className={TopbarStyle.dropdownLink} onClick={() =>{handleDropdown(false)}}>Reset Password</li>
				</ul>
				)}
			</div>
		</div>
	)
}

export default TopBar;
