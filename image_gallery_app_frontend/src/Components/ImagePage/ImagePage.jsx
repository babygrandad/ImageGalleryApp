import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../config'
import axios from 'axios';
import { getUser } from '../../utils/auth';
import ImagePageStyle from './ImagePage.module.css'

function ImagePage() {
	const { imageID } = useParams();
	const user = getUser();
	console.log(user)
	const imgRef = useRef(null);

	const initialState = {
		imageID: '',
		imageName: '',
		imageDescription: '',
		uploadDate: '',
		lastUpdated: '',
		imageURL: '',
		imageDeleteURL: '',
		imageThumbnailURL: '',
		fullName: '',
		imageDimensions: '',
		fileSize: '',
		dateCaptured: '',
		make: '',
		model: '',
		lenseType: '',
		category: {},
		tags: [],
		likesCount: '',
		comments: []
	}

	const [image, setImage] = useState(initialState);
	const [comments, setComments] = useState([])
	const [likes, setLikes] = useState(null)
	const [imageClasses, setImageClasses] = useState({
		wrapper: '',
		container: '',
		image: ''
	  });

	useEffect(() => {
		const imageData = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/Image/${imageID}`, {
					headers: {
						'Authorization': `Bearer ${user.token}`
					}
				});
				console.log('Response:', response.data);
				setImage(response.data)
				setLikes(response.data.likesCount)
				setComments(response.data.comments)
			} catch (error) {
				console.error('Error posting data:', error);
			}
		};

		if (imageID) {
			imageData();
		}
	}, [imageID]);

	const handleImageLoad = () => {
		if (imgRef.current) {
			const naturalWidth = imgRef.current.naturalWidth;
			const naturalHeight = imgRef.current.naturalHeight;
			setImageClasses({
				wrapper: naturalWidth > naturalHeight ? ImagePageStyle.wideWrapper : ImagePageStyle.tallWrapper,
				container: naturalWidth > naturalHeight ? ImagePageStyle.wideContainer : ImagePageStyle.tallContainer, 
				image: naturalWidth > naturalHeight ? ImagePageStyle.wideImage : ImagePageStyle.tallImage
			})
		}
	};

	const handleLikes = async () => {
		try {
			const response = await axios.post(`${BASE_URL}/like/${imageID}`, {}, {
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			});

			if (response.data === "Image liked.") {
				setLikes(prevLikes => prevLikes + 1);  // Increment the likes count
			} else if (response.data === "Image unliked.") {
				setLikes(prevLikes => prevLikes - 1);  // Decrement the likes count
			}
		} catch (error) {
			console.error('Error processing like data:', error);
		}
	};

	return (
		<div className={ImagePageStyle.wrapper}>
			<div className={`${ImagePageStyle.ImageWrapper} ${imageClasses.wrapper}`}>
				<div className={`${ImagePageStyle.ImageContainer} ${imageClasses.container}`}>
					<div className={ImagePageStyle.closingContainer}>
						<span className={`${ImagePageStyle.closingIcon} material-symbols-outlined`}>close</span>
					</div>
					<img ref={imgRef} className={`${ImagePageStyle.Image} ${imageClasses.image}`} src={image.imageURL} alt={image.imageName} onLoad={handleImageLoad}/>
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
						<span className={`${ImagePageStyle.socialButton} material-symbols-outlined`} onClick={handleLikes}>favorite</span>
						<span className={`${ImagePageStyle.socialCount} ${ImagePageStyle.likesCount}`}>{likes}</span>{console.log("Likes: ",likes)}
					</div>
					<div className={ImagePageStyle.socialButtoncontainer}>
						<span className={`${ImagePageStyle.socialButton} material-symbols-outlined`}>chat_bubble</span>
						<span className={`${ImagePageStyle.socialCount} ${ImagePageStyle.commentCount}`}>{image.comments.length}</span>
					</div>
				</div>

				<div className={ImagePageStyle.commentsContainer}>
					{comments.length > 0 && comments.map((comment) => (
						<div className={ImagePageStyle.commentWrapper} key={comment.commentID}>
							<div className={ImagePageStyle.nameAndActions}>
								<h5>
									{comment.fullName}
									{comment.isEdited ? <span className={ImagePageStyle.editedComment}>Edited</span> : ""}
								</h5>
								<div className={ImagePageStyle.crudWrapper}>
									<div className={ImagePageStyle.crudButtoncontainer}>
										<span className={`${ImagePageStyle.actionButton} ${ImagePageStyle.actionButtonPrimary} material-symbols-outlined`}>edit</span>
									</div>
									<div className={ImagePageStyle.crudButtoncontainer}>
										<span className={`${ImagePageStyle.actionButton} ${ImagePageStyle.actionButtonAccent} material-symbols-outlined`} onClick={() => handleDelete(imageID)}>delete</span>
									</div>
								</div>
							</div>
							<p className={ImagePageStyle.commentText}>{comment.commentContent}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ImagePage 