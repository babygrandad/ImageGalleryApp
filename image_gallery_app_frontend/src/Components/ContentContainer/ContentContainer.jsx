import React from 'react'
import ContentContainerStyle from './ContentContainer.module.css'
import { Outlet } from 'react-router-dom'
import TopBar from '../SubComponents/TopBar'


function ContentContainer() {
  return (
	<div className={ContentContainerStyle.contentContainer}>
		<TopBar 
		breadcrum={'Home'}
		fullName={'Relebogile Nkotswe'}
		/>
		<Outlet />
	</div>
  )
}

export default ContentContainer