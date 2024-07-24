import React from 'react'
import TopbarStyle from './Topbar.module.css'

function TopBar({breadcrum, fullName}) {
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