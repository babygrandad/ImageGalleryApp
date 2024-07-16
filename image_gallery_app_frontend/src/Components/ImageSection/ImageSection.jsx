import React from 'react'
import ImageSectionStyle from './ImageSection.module.css'
import SearchArea from '../SubComponents/SearchArea'
import GridImage from './GridImage'
import GridPagination from '../SubComponents/GridPagination'

function ImageSection() {
	return (
		<div className={ImageSectionStyle.ImageSection}>
				<SearchArea />
				<div className={ImageSectionStyle.imagesWrapper}>
					<GridImage
						imageID="image1"
						imageURL="https://picsum.photos/id/237/300/200"
						imageName="Dog"
						imageDescription="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?"
					/>

					<GridImage
						imageID="image2"
						imageURL="images/palace.jpg"
						imageName="Palace"
						imageDescription="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?"
					/>

					<GridImage
						imageID="image3"
						imageURL="https://picsum.photos/id/217/300/200"
						imageName="Dog"
						imageDescription="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?"
					/>

					<GridImage
						imageID="image4"
						imageURL="https://picsum.photos/id/137/300/200"
						imageName="Dog"
						imageDescription="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?"
					/>

					<GridImage
						imageID="image5"
						imageURL="https://picsum.photos/id/235/300/200"
						imageName="Dog"
						imageDescription="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?"
					/>

					<GridImage
						imageID="image6"
						imageURL="https://picsum.photos/id/37/300/200"
						imageName="Dog"
						imageDescription="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem nam repellat, aliquam veniam, unde sequi corporis ducimus quidem voluptate quisquam accusamus sit nesciunt. Sequi veritatis iste ut maiores error?"
					/>
				</div>
				<GridPagination />
		</div>
	)
}

export default ImageSection