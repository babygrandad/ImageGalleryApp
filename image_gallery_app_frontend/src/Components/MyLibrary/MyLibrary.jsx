import React, { useEffect, useState, useRef } from 'react';
import ImageSectionStyle from './MyLibrary.module.css';
import SearchArea from '../SubComponents/SearchArea';
import LibraryGridImage from './LibraryGridImage';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import BASE_URL from '../../config';
import { getUser } from '../../utils/auth';

function MyLibrary() {
  const [imageData, setImageData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PageSize = 9
  const hasFetched = useRef(false);
  const user = getUser();

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/image/mylibrary`, {
        params: {
          PageNumber: pageNumber,
          PageSize: PageSize,
        },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      // Log the response for debugging (optional)
      console.log(response);

      if (response.status === 200) {
        const newImages = response.data.data; // Assuming "data" holds the actual data

        if (newImages.length < PageSize) {
          setImageData((prevData) => [...prevData, ...newImages]); // Update data efficiently
          setHasMore(false);
        } else {
          setImageData((prevData) => [...prevData, ...newImages]); // Update data efficiently
          setPageNumber(pageNumber + 1)
        }
      }
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  useEffect(() => {
    //fetchImages(); // Fetch initial images
    if (!hasFetched.current) {
      fetchImages(); // Fetch initial images
      hasFetched.current = true;
    }
  }, []);

  return (
    <>
      <SearchArea />
      <h4>My Library</h4>
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
            <LibraryGridImage key={image.imageID} {...image} />
          ))}
        </InfiniteScroll>
      </div>
    </>
    
  );
}

export default MyLibrary;
