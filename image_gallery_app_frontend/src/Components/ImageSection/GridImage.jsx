import React from 'react'
import ImageSectionStyle from './ImageSection.module.css'

function GridImage({ imageID, imageName, imageURL, category, tags }) {

	const handleClick = (e) => {
		//	implement logic
	}

	return (
		<div className={ImageSectionStyle.imageContainer}
			data-category={category.categoryName}
			data-tags={tags && tags.length > 0 ? tags.map(tag => tag.tagName).join(',') : ''}
		>
			<div className={ImageSectionStyle.imageAndDetailWrapper}>
				<img id={imageID} src={imageURL} alt={imageName} className={ImageSectionStyle.image} onClick={handleClick} />
				<div className={ImageSectionStyle.imageDetails}>
					<h5 className={ImageSectionStyle.imageName}>{imageName}</h5>
				</div>
			</div>

			<div className={ImageSectionStyle.engagementButtonsContainer}>
				<span className="material-symbols-outlined">favorite</span>
				<span className="material-symbols-outlined">chat_bubble</span>
			</div>
		</div>


	)
}

export default GridImage