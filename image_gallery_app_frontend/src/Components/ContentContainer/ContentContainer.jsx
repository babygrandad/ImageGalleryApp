import React, { useEffect, useState } from 'react'
import ContentContainerStyle from './ContentContainer.module.css'
import { Outlet } from 'react-router-dom'
import TopBar from '../SubComponents/TopBar'
import { getUser } from '../../utils/auth'

function ContentContainer() {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		// Fetch the user data and set it to state
		const user = getUser();
		setCurrentUser(user);
	}, []);

	return (
		<div className={ContentContainerStyle.contentContainer}>
			<TopBar 
				breadcrum={'Home'} // Pass default breadcrumb value
				user={currentUser} // Pass currentUser object to TopBar
			/>
			<Outlet />
		</div>
	)
}

export default ContentContainer;
