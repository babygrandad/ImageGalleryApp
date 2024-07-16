import React from 'react'
import SearchAreaStyle from './SearchArea.module.css'

function SearchArea() {
	return (
		<div className={SearchAreaStyle.searchAreaContainer}>

			<form action="" className={SearchAreaStyle.searchForm}>
				<div className={SearchAreaStyle.searchBarContainer}>
					<span className={`${SearchAreaStyle.searchIcon} material-symbols-outlined`}>
						search
					</span>
					<input className={SearchAreaStyle.searchBar} type="search" name="" id="" placeholder='Search for...' />
				</div>
				<button className={SearchAreaStyle.searchButton} type="button"><span class="material-symbols-outlined">filter_list</span>Filters</button>
			</form>

		</div>
	)
}

export default SearchArea