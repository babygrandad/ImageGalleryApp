import React, { useEffect, useState } from 'react'
import ContentContainerStyle from './ContentContainer.module.css'
import { Outlet } from 'react-router-dom'
import TopBar from '../SubComponents/TopBar'
import { getUser } from '../../utils/auth'


function ContentContainer() {
	const [currentUser, setCurrentUser] = useState(null);
	
	useEffect(() => {
		setCurrentUser(getUser().fullName);
	}, [currentUser]);


  return (
	<div className={ContentContainerStyle.contentContainer}>
		<TopBar 
		breadcrum={'Home'}
		fullName={currentUser}
		/>
		<Outlet />
	</div>
  )
}

export default ContentContainer