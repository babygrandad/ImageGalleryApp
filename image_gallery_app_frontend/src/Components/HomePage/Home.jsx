import React from 'react'
import CommonStyles from '../CommonComponents/CommonComponents.module.css'
import SideMenu from '../SideMenu/SideMenu'
import ContentContainer from '../ContentContainer/ContentContainer';
import ImageSection from '../ImageSection/ImageSection';



function Home() {
	return (
		<div className={CommonStyles.container}>
			<SideMenu />
			<ContentContainer />
		</div>
	)
}

export default Home