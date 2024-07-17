import React from 'react'
import TopbarStyle from './Topbar.module.css'

function TopBar() {
	return (
		<div className={TopbarStyle.container}>
			<div className="currentPage">
				Home
			</div>
			<div className="topBarProfileContainer">
				Relebogile Nkotswe
			</div>
		</div>
	)
}

export default TopBar