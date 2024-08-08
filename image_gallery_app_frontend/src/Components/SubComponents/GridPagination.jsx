import React from 'react';
import GridStyle from './GridPagination.module.css';

function GridPagination({ totalCount, pageSize, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalCount / pageSize);

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (currentPage > totalPages - 4) {
                pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pageNumbers;
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber === '...') return;
        onPageChange(pageNumber);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={GridStyle.grid_pagination_container}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {getPageNumbers().map((number, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(number)}
                    className={number === currentPage ? GridStyle.active : ''}
                    disabled={number === '...'}
                >
                    {number}
                </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    );
}

export default GridPagination;
