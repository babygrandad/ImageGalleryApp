import React, { useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../config'
import axios from 'axios';
import { getUser } from '../../utils/auth';
import ImagePageStyle from './ImagePage.module.css'

function ImagePage() {
	const { imageID } = useParams();

	const initialState = {
	imageID	:	'',
	imageName	:	'',
	imageDescription	:	'',
	uploadDate	:	'',
	lastUpdated	:	'',
	imageURL	:	'',
	imageDeleteURL	:	'',
	imageThumbnailURL	:	'',
	fullName	:	'',
	imageDimensions	:	'',
	fileSize	:	'',
	dateCaptured	:	'',
	make	:	'',
	model	:	'',
	lenseType	:	'',
	category		:{},
	tags		:[],
	likesCount	:	'',
	comments		:[]
	}
	

	const [image, setImage] = useState(initialState);
	const [comments, setComments] = useState([])
	const [likes, setLikes] = useState(null)

	useEffect(() => {
		const imageData = async () => {
			try {
				const response = await axios.get(`http://localhost:5086/api/Image/${imageID}`);
				console.log('Response:', response.data);
				setImage(response.data)
			} catch (error) {
				console.error('Error posting data:', error);
			}
		};

		if (imageID) {
			imageData();
		}
	}, [imageID]);

	return (
		<div className={ImagePageStyle.wrapper}>
			<div className={ImagePageStyle.ImageWrapper}>
				<div className={`${ImagePageStyle.ImageContainer}`}>
					<div className={ImagePageStyle.closingContainer}>
						<span className={`${ImagePageStyle.closingIcon} material-symbols-outlined`}>close</span>
					</div>
					<img className={ImagePageStyle.Image} src={image.imageURL} alt={image.imageName} />
					<div className={ImagePageStyle.imageDetailsWrapper}>
						{image.tags.length > 0 && image.tags.map((tag) => (
							<span className={ImagePageStyle.tags} key={tag.tagName}>{tag.tagName.trim()}</span>
						))}

						<div className={ImagePageStyle.ImageDetails}>
							<h5 className={ImagePageStyle.imageName}>{image.imageName}</h5>
							<p className={ImagePageStyle.imageDescription}>{image.imageDescription}</p>
						</div>
					</div>
				</div>
				<div className={ImagePageStyle.socialWrapper}>
					<div className={ImagePageStyle.socialButtoncontainer}>
						<span className={`${ImagePageStyle.socialButton} material-symbols-outlined`}>favorite</span>
						<span className={`${ImagePageStyle.socialCount} ${ImagePageStyle.likesCount}`}>{image.likesCount}</span>
					</div>
					<div className={ImagePageStyle.socialButtoncontainer}>
						<span className={`${ImagePageStyle.socialButton} material-symbols-outlined`}>chat_bubble</span>
						<span className={`${ImagePageStyle.socialCount} ${ImagePageStyle.commentCount}`}>{image.comments.length}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ImagePage 