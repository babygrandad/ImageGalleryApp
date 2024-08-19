import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import TopbarStyle from './Topbar.module.css'

function TopBar({ fullName }) {

	const location = useLocation();

	const breadcrumbs = [
		{ path: "/home", crum: "Home" },
		{ path: "/upload", crum: "Upload Page" },
		{ path: "/mylibrary", crum: "My Library" }
	];

	const breadcrum = breadcrumbs.find(b => b.path === location.pathname)?.crum || "Unknown";

	return (
		<div className={TopbarStyle.container}>
			<div className="currentPage">
				{breadcrum}
			</div>
			<div className="topBarProfileContainer">
				{fullName}
			</div>
		</div>
	)
}

export default TopBar