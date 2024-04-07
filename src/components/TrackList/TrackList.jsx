import React from 'react'
import styles from './TrackList.module.css'
import Track from '../Track/Track'

const TrackList = ({tracks, onRemoveTrack, onSave, onNameChange}) => {
    let name = "";
    const handleNameChange = (event) => {
        name = event.target.value;
        onNameChange(name)
    }

    const handleSaveClick = () => {
            onSave();

    }

    return (
        <div className={styles.track_list}>
            <h1>Tracks</h1>
            <input type="text" id={styles.playlist_name} placeholder='Playlist' onChange={handleNameChange}/>
            {
                 tracks.map((track) => (<Track name={track.name} artist={track.artist} uri={track.uri} id={track.id} isRemoval={true} onRemoveTrack={onRemoveTrack} />))
            }
            <button id={styles.save} onClick={() => (handleSaveClick())}>Save to Spotify</button>
        </div>
    )
}

export default TrackList