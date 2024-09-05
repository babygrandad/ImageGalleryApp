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
  const hasFetched = useRef(false);
  const user = getUser();
  const PageSize = 9;

  // States for search and filter options
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchBy, setSelectedSearchBy] = useState('name');
  const [sortOrder, setSortOrder] = useState(true);

  const fetchImages = async (query, filter, sort) => {
    console.log('fetchImages called with:', { query, filter, sort });
    
    // Prepare request parameters based on the selected filter
    const params = {
      PageNumber: pageNumber,
      PageSize: PageSize,
      //SortBy: filter === 'name' ? 'ImageName' : filter,
      IsDescending: sort,
    };
    
    // Map filter to the appropriate query parameter
    switch (filter) {
      case 'name':
        params.Name = query;
        break;
      case 'tag':
        params.Tag = query;
        break;
      case 'category':
        params.Category = query;
        break;
      default:
        break;
    }
    
    console.log('Request params:', params);
    
    try {
      const response = await axios.get(`${BASE_URL}/image`, {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      console.log('Response data:', response.data);
      
      if (response.status === 200) {
        const newImages = response.data.data;
        if (pageNumber === 1) {
          setImageData(newImages);
        } else {
          setImageData((prevData) => [...prevData, ...newImages]);
        }
        if (newImages.length < PageSize) {
          setHasMore(false);
        } else {
          setPageNumber(pageNumber + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };
  
  
  const handleLikes = async (imageID) => {
    try {
      const response = await axios.post(`${BASE_URL}/like/${imageID}`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Update the image data with the new like count
      setImageData((prevData) =>
        prevData.map((image) => {
          if (image.imageID === imageID) {
            return {
              ...image,
              likesCount: response.data === 'Image liked.' ? image.likesCount + 1 : image.likesCount - 1,
            };
          }
          return image;
        })
      );
    } catch (error) {
      console.error('Error processing like:', error);
    }
  };

  const handleSearch = (query, filter, sort) => {
    setPageNumber(1); // Reset page number
    setHasMore(true); // Ensure more results can be fetched
    setImageData([]); // Clear current images
    
    // Set the search parameters
    setSearchQuery(query);
    setSelectedSearchBy(filter);
    setSortOrder(sort);
  };

  useEffect(() => {
    // Only fetch images if pageNumber is 1 (i.e., a new search)
    if (pageNumber === 1) {
      fetchImages(searchQuery, selectedSearchBy, sortOrder);
    }
  }, [searchQuery, selectedSearchBy, sortOrder, pageNumber]);

  return (
    <>
      <SearchArea onSearch={handleSearch} />
      <div className={ImageSectionStyle.ImageSection} id="ImageSection">
        <InfiniteScroll
          className={ImageSectionStyle.infiniteScroll}
          dataLength={imageData.length}
          next={() => fetchImages(searchQuery, selectedSearchBy, sortOrder)}
          hasMore={hasMore}
          loader={<div>Loading more images...</div>}
          endMessage={<div>No more images to load.</div>}
          scrollableTarget="ImageSection"
        >
          {imageData.map((image) => (
            <GridImage key={image.imageID} {...image} handleLikes={handleLikes} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default ImageSection;
