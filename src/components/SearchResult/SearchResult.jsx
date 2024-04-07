import React from 'react'
import styles from './SearchResult.module.css'
import Track from '../Track/Track'

const SearchResult = ({tracks, onAddTrack, isLoading}) => {
  return (
    <div className={styles.search_result}>
        <h1 id={styles.search_heading}>Search Result</h1>
        {
          isLoading ? <h3>Loading</h3> : 
          tracks.map((track) => 
            (<Track name={track.name} id={track.id} uri={track.uri} artist={track.artist} key={track.id} onAddTrack={onAddTrack} />))
        }
    </div>
  )
}

export default SearchResult