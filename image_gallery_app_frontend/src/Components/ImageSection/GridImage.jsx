import React from 'react'
import ImageSectionStyle from './ImageSection.module.css'
import { useNavigate } from 'react-router-dom';

function GridImage({ imageID, imageName, imageURL, category, tags, likesCount, commentCount }) {

	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/post/${imageID}`);
	};

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

			<div className={ImageSectionStyle.socialWrapper}>
			<div className={ImageSectionStyle.socialButtoncontainer}>
						<span className={`${ImageSectionStyle.socialButton} material-symbols-outlined`}>favorite</span>
						<span className={`${ImageSectionStyle.socialCount} ${ImageSectionStyle.likesCount}`}>{likesCount}</span>
					</div>
					<div className={ImageSectionStyle.socialButtoncontainer}>
						<span className={`${ImageSectionStyle.socialButton} material-symbols-outlined`}>chat_bubble</span>
						<span className={`${ImageSectionStyle.socialCount} ${ImageSectionStyle.commentCount}`}>{commentCount}</span>
					</div>
			</div>
		</div>


	)
}

export default GridImage