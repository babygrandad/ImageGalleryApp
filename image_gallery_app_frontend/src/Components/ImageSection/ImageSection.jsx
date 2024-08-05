import React, { useEffect, useState } from 'react'
import ImageSectionStyle from './ImageSection.module.css'
import SearchArea from '../SubComponents/SearchArea'
import GridImage from './GridImage'
import GridPagination from '../SubComponents/GridPagination'
import axios from 'axios'
import BASE_URL from '../../config';

function ImageSection() {
	const [imageData, setImageData] = useState([])

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/image`);
				setImageData(response.data);
			} catch (error) {
				console.error('Error fetching image data:', error);
			}
		}

		fetchImages();
	}, []);



	return (
		<div className={ImageSectionStyle.ImageSection}>
			<SearchArea />
			<div className={ImageSectionStyle.imagesWrapper}>
				{imageData.map(image => (
					<GridImage key={image.imageID} {...image} />
				))}
			</div>
			<GridPagination />
		</div>
	)
}

export default ImageSection