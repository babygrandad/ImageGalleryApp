import React, { useState } from 'react'
import SearchAreaStyle from './SearchArea.module.css'

function SearchArea() {

	const [searchQuery, setSearchQuery] = useState('');

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = () => {
		onSearch(searchQuery);
	};

	return (
		<div className={SearchAreaStyle.searchAreaContainer}>

			<form action="" className={SearchAreaStyle.searchForm}>
				<div className={SearchAreaStyle.searchBarContainer}>
					<span className={`${SearchAreaStyle.searchIcon} material-symbols-outlined`}>
						search
					</span>

					<input
						type="text"
						value={searchQuery}
						onChange={handleInputChange}
						placeholder="Search by tags, category, or name"
						className={SearchAreaStyle.searchBar}
					/>

				</div>
				<button onClick={handleSearch} className={SearchAreaStyle.searchButton}>
					<span className="material-symbols-outlined">filter_list</span>Filters
				</button>
			</form>

		</div>
	)
}

export default SearchArea