import React from 'react'
import ImageSectionStyle from './ImageSection.module.css'

function ImageSection() {
	return (
		<div className={ImageSectionStyle.ImageSection}>
			<div className={ImageSectionStyle.container}>
				<div className={ImageSectionStyle.searchAreaContainer}>

						<form action="">
							<div className="searcBarContainer">
							<input type="search" name="" id="" placeholder='Search for...' />
							</div>
							<button type="button">Filters</button>
						</form>

				</div>
				<div className={ImageSectionStyle.imagesWrapper}>

					<div className={ImageSectionStyle.imageContainer}>
						<img src="/images/palace.jpg" alt="" className={ImageSectionStyle.image}/>
						<div className={ImageSectionStyle.imageDetails}>
							<h5 className={ImageSectionStyle.imageName}>Image Name</h5>
							<p className={ImageSectionStyle.imageDescription}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?</p>
						</div>
					</div>

					<div className={ImageSectionStyle.imageContainer}>
						<img className={ImageSectionStyle.image} src="images/palace.jpg" alt="" />
						<div className={ImageSectionStyle.imageDetails}>
							<h5 className={ImageSectionStyle.imageName}>Image Name</h5>
							<p className={ImageSectionStyle.imageDescription}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?</p>
						</div>
					</div>

					<div className={ImageSectionStyle.imageContainer}>
						<img className={ImageSectionStyle.image} src="images/palace.jpg" alt="" />
						<div className={ImageSectionStyle.imageDetails}>
							<h5 className={ImageSectionStyle.imageName}>Image Name</h5>
							<p className={ImageSectionStyle.imageDescription}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?</p>
						</div>
					</div>

				</div>
				<div className={ImageSectionStyle.paginationContainer}>
					pagination
				</div>
			</div>
		</div>
	)
}

export default ImageSection