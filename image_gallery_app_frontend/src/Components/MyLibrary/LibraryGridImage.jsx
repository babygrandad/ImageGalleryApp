import React from 'react'
import ImageSectionStyle from './MyLibrary.module.css'
import { useNavigate } from 'react-router-dom';

function LibraryGridImage({ imageID, imageName, imageURL, category, tags, likesCount, commentCount }) {

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

			<div className={ImageSectionStyle.actionButtonsWrapper}>
				<div className={ImageSectionStyle.socialWrapper}>
					<div className={ImageSectionStyle.socialButtoncontainer}>
						<span className={`${ImageSectionStyle.actionButton} material-symbols-outlined`}>favorite</span>
						<span className={`${ImageSectionStyle.socialCount} ${ImageSectionStyle.likesCount}`}>{likesCount}</span>
					</div>
					<div className={ImageSectionStyle.socialButtoncontainer}>
						<span className={`${ImageSectionStyle.actionButton} material-symbols-outlined`}>chat_bubble</span>
						<span className={`${ImageSectionStyle.socialCount} ${ImageSectionStyle.commentCount}`}>{commentCount}</span>
					</div>
				</div>
				<div className={ImageSectionStyle.crudWrapper}>
					<div className={ImageSectionStyle.crudButtoncontainer}>
						<span className={`${ImageSectionStyle.actionButton} ${ImageSectionStyle.actionButtonPrimary} material-symbols-outlined`}>edit</span>
					</div>
					<div className={ImageSectionStyle.crudButtoncontainer}>
						<span className={`${ImageSectionStyle.actionButton} ${ImageSectionStyle.actionButtonAccent} material-symbols-outlined`}>delete</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LibraryGridImage