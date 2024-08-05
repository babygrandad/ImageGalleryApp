import React from 'react'
import ImageSectionStyle from './ImageSection.module.css'

function GridImage({ imageID, imageName, imageDescription, imageURL, imageThumbnailURL,  category, tags }) {
	return (
		<div className={ImageSectionStyle.imageContainer}
		data-category={category.categoryName}
		data-tags={tags && tags.length > 0 ? tags.map(tag => tag.tagName).join(',') : ''}
		
		>
			<img id={imageID} src={imageThumbnailURL} alt={imageName} className={ImageSectionStyle.image} />
			<div className={ImageSectionStyle.imageDetails}>
				<h5 className={ImageSectionStyle.imageName}>{imageName}</h5>
				<p className={ImageSectionStyle.imageDescription}>{imageDescription}</p>
			</div>
		</div>
	)
}

export default GridImage