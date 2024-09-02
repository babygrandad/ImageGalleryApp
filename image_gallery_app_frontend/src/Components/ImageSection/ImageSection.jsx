import React, { useEffect, useState, useRef } from 'react';
import ImageSectionStyle from './ImageSection.module.css';
import SearchArea from '../SubComponents/SearchArea';
import GridImage from './GridImage';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import BASE_URL from '../../config';
import { getUser } from '../../utils/auth';

function ImageSection() {
  const [imageData, setImageData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
//  const [PageSize, setPageSize] = useState(9);
  const hasFetched = useRef(false);
  const user = getUser();
  const PageSize = 9

  const fetchImages = async () => {
      try {
          const response = await axios.get(`${BASE_URL}/image`, {
              params: {
                  PageNumber: pageNumber,
                  PageSize: PageSize,
              },
              headers: {
                  'Authorization': `Bearer ${user.token}`
              }
          });

          if (response.status === 200) {
              const newImages = response.data.data;
              if (newImages.length < PageSize) {
                  setHasMore(false);
              } else {
                  setPageNumber(pageNumber + 1);
              }
              setImageData((prevData) => [...prevData, ...newImages]);
          }
      } catch (error) {
          console.error('Error fetching image data:', error);
      }
  };

  const handleLikes = async (imageID) => {
      try {
          const response = await axios.post(`${BASE_URL}/like/${imageID}`, {}, {
              headers: {
                  'Authorization': `Bearer ${user.token}`
              }
          });

          // Update the image data with the new like count
          setImageData(prevData => prevData.map(image => {
              if (image.imageID === imageID) {
                  return {
                      ...image,
                      likesCount: response.data === "Image liked." ? image.likesCount + 1 : image.likesCount - 1
                  };
              }
              return image;
          }));
      } catch (error) {
          console.error('Error processing like:', error);
      }
  };

  useEffect(() => {
      if (!hasFetched.current) {
          fetchImages();
          hasFetched.current = true;
      }
  }, []);

  return (
      <>
          <SearchArea />
          <div className={ImageSectionStyle.ImageSection} id="ImageSection">
              <InfiniteScroll
                  className={ImageSectionStyle.infiniteScroll}
                  dataLength={imageData.length}
                  next={fetchImages}
                  hasMore={hasMore}
                  loader={<div>Loading more images...</div>}
                  endMessage={<div>No more images to load.</div>}
                  scrollableTarget="ImageSection"
              >
                  {imageData.map(image => (
                      <GridImage key={image.imageID} {...image} handleLikes={handleLikes} />
                  ))}
              </InfiniteScroll>
          </div>
      </>
  );
}

export default ImageSection;
