import React, { useEffect, useState } from 'react';
import ImageSectionStyle from './ImageSection.module.css';
import SearchArea from '../SubComponents/SearchArea';
import GridImage from './GridImage';
import GridPagination from '../SubComponents/GridPagination';
import axios from 'axios';
import BASE_URL from '../../config';

function ImageSection() {
    const [imageData, setImageData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalCount, setTotalCount] = useState(0);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/image`, {
                params: {
                    PageNumber: pageNumber,
                    PageSize: pageSize
                }
            });
            setImageData(response.data.data);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [pageNumber, pageSize]);

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    return (
        <div className={ImageSectionStyle.ImageSection}>
            <SearchArea />
            <div className={ImageSectionStyle.imagesWrapper}>
                {imageData.map(image => (
                    <GridImage key={image.imageID} {...image} />
                ))}
            </div>
            <GridPagination
                totalCount={totalCount}
                pageSize={pageSize}
                currentPage={pageNumber}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ImageSection;
