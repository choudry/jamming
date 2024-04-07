import React from 'react';
import styles from './SearchBar.module.css'

export const SearchBar = ({searchTerm, setSearchTerm}) => {
  return (
    <div id={styles.search_bar_container}>
        <input 
        type="text" 
        id={styles.search_input} 
        value={searchTerm} 
        onChange={(event) => (setSearchTerm(event.target.value))}
        name="track" 
        placeholder='Search' />
    </div>
  )
}