import React from 'react'
import  BASE_URL  from '../../config'
import axios from 'axios';
import { getUser } from '../../utils/auth';
import ImagePageStyle from './ImagePage.module.css'

function ImagePage() {
	return (
		<div className={ImagePageStyle.wrapper}>
			<div className={ImagePageStyle.ImageWrapper}>
				<div className={`${ImagePageStyle.ImageContainer}`}>
					<div className={ImagePageStyle.closingContainer}>
					<span className={`${ImagePageStyle.closingIcon} material-symbols-outlined`}>close</span>
					</div>
					<img className={ImagePageStyle.Image} src="https://i.ibb.co/nMJVzKt/Old-Beautiful-Church.jpg" alt="image Name" />
					<div className={ImagePageStyle.imageDetailsWrapper}>
						<span className={ImagePageStyle.tags}>#tag 1</span>
						<span className={ImagePageStyle.tags}>#tag 2</span>
						<span className={ImagePageStyle.tags}>#tag 3</span>
						<span className={ImagePageStyle.tags}>#tag 4</span>
						<span className={ImagePageStyle.tags}>#tag 5</span>
						<div className={ImagePageStyle.ImageDetails}>
							<h5 className={ImagePageStyle.imageName}>Mr Mittens</h5>
							<p className={ImagePageStyle.imageDescription}>This is my lovely when sleeping pet Mr Mittins. I say lovely when sleeping because he is a menice when awake :(</p>
						</div>
					</div>
				</div>
				<div className={ImagePageStyle.socialWrapper}>
					<span className="material-symbols-outlined">favorite</span> <span className="material-symbols-outlined">comment</span>
				</div>
			</div>
		</div>
	)
}

export default ImagePage 