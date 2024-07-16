import React from 'react'
import ImageSectionStyle from './ImageSection.module.css'

function GridImage({ imageID, imageURL, imageName, imageDescription }) {
	return (
		<div className={ImageSectionStyle.imageContainer}>
			<img id={imageID} src={imageURL} alt={imageName} className={ImageSectionStyle.image} />
			<div className={ImageSectionStyle.imageDetails}>
				<h5 className={ImageSectionStyle.imageName}>{imageName}</h5>
				<p className={ImageSectionStyle.imageDescription}>{imageDescription}</p>
			</div>
		</div>
	)
}

export default GridImage