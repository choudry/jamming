import React from 'react';
import styles from './Track.module.css'

const Track = ({name, artist, id, uri, isRemoval=false, onAddTrack, onRemoveTrack}) => {
  const addTrack = () => {
    onAddTrack({id: id, name: name, artist: artist, uri: uri});
  }

  const removeTrack = () => {
    onRemoveTrack({id: id, name: name, artist: artist});
  }

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button onClick={removeTrack} className={styles.track_action}>-</button>
      )
    }

    return (
      <button onClick={addTrack} className={styles.track_action}>+</button>
    )
  }


  return (
    <div id={styles.track_container}>
      <div className={styles.track_infromation}>
        <div id={styles.track}>{name}</div>
        <div id={styles.artist}>{artist}</div>
      </div>

      { renderAction() }
    </div>
    
  )
}

export default Track