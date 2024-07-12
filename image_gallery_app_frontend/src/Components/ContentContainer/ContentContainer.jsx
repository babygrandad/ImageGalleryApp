import React from 'react'
import ContentContainerStyle from './ContentContainer.module.css'
import TopbarStyle from './Topbar.module.css'
import { Outlet } from 'react-router-dom';

function ContentContainer() {
  return (
	<div className={ContentContainerStyle.contentContainer}>
		<div className={TopbarStyle.container}>
			<div className="currentPage">
				Home
			</div>
			<div className="topBarProfileContainer">
				Relebogile Nkotswe
			</div>
		</div>
		<Outlet />
	</div>
  )
}

export default ContentContainer