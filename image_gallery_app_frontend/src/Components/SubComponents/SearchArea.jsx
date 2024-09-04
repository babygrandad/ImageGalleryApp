import React, { useState } from 'react';
import SearchAreaStyle from './SearchArea.module.css';

function SearchArea({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('name'); // Default to 'name'
  const [sortOrder, setSortOrder] = useState(true); // Default to ascending

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the form from submitting
      handleSearch(); // Trigger the search function
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery, selectedFilter, sortOrder); // Call the onSearch function with the current filter and sort order
  };

  const handleOpenFilter = () => {
    setOpenFilters(!openFilters);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value === 'true'); // Convert to boolean
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={SearchAreaStyle.searchAreaContainer}>
      <form className={SearchAreaStyle.searchForm} onSubmit={(e) => e.preventDefault()}>
        <div className={SearchAreaStyle.searchBarContainer}>
          <span className={`${SearchAreaStyle.searchIcon} material-symbols-outlined`}>
            search
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Call the handleKeyDown function
            placeholder="Search by tags, category, or name"
            className={SearchAreaStyle.searchBar}
          />
        </div>
        <div onClick={handleOpenFilter} className={SearchAreaStyle.searchButton}>
          <span className="material-symbols-outlined">filter_list</span>Filters
          {openFilters && (
            <div className={SearchAreaStyle.filterMenu} onClick={handleFormClick}>
              <div className={`${SearchAreaStyle.filterDivider} ${SearchAreaStyle.searchOptionsWrapper}`}>
                <span>Search By:</span>
                <div className={SearchAreaStyle.filterWrapper}>
                  <input
                    type="radio"
                    checked={selectedFilter === 'name'}
                    name="search"
                    value="name"
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className={SearchAreaStyle.filterWrapper}>
                  <input
                    type="radio"
                    checked={selectedFilter === 'category'}
                    name="search"
                    value="category"
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="category">Category</label>
                </div>
                <div className={SearchAreaStyle.filterWrapper}>
                  <input
                    type="radio"
                    checked={selectedFilter === 'tag'}
                    name="search"
                    value="tag"
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="tag">Tag</label>
                </div>
              </div>

              <div className={`${SearchAreaStyle.filterDivider} ${SearchAreaStyle.sortOptionsWrapper}`}>
                <span>Sort By:</span>
                <div className={SearchAreaStyle.filterWrapper}>
                  <input
                    type="radio"
                    checked={sortOrder === true}
                    name="order"
                    value="true"
                    onChange={handleSortChange}
                  />
                  <label htmlFor="asc">ASC</label>
                </div>
                <div className={SearchAreaStyle.filterWrapper}>
                  <input
                    type="radio"
                    checked={sortOrder === false}
                    name="order"
                    value="false"
                    onChange={handleSortChange}
                  />
                  <label htmlFor="desc">DSC</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchArea;
