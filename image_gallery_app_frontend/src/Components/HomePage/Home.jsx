import React from 'react'
import HomeStyle from './Home.module.css'
import SideMenu from '../SideMenu/SideMenu'
import ContentContainer from '../ContentContainer/ContentContainer';



function Home() {
	return (
		<div className={HomeStyle.container}>
			<SideMenu />
			<ContentContainer />
		</div>
	)
}

export default Home