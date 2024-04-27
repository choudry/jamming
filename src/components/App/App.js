import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { SearchBar } from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import TrackList from '../TrackList/TrackList';
import {searchTracks, Spotify} from '../../API/api';

function App() {
  const [searchTerm, setSearchTerm] = useState("Maulaya Salli Wa Salim");
  const [searchResult, setSearchResult] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks = await searchTracks(searchTerm); // Wait for promise to resolve
        setSearchResult(tracks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const search = () => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const tracks = await searchTracks(searchTerm);
        setSearchResult(tracks);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }

  const addTrack = (newTrack) => {
    setTrackList((prev) => [...prev, newTrack]);
    setSearchResult((prev) => (prev.filter(track => track.id !== newTrack.id)))
  }

  const removeTrack = (trackToRemove) => {
    setTrackList((prev) => (prev.filter(track => track.id !== trackToRemove.id)));
    setSearchResult(prev => [...prev, trackToRemove]);
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
    
    const tracksUri = trackList.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, tracksUri)
    
  }

  return (
    <div className={styles.App}>
      <h1 data-testid="main_heading">
       Ja<span className={styles.highlight}>mm</span>ing
       </h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={styles.search_button_container}>
        <button className={styles.search_button} data-testid="searchButton" onClick={() => (search())}>Search</button>
      </div>

      <div className={styles.main_container}>
        <SearchResult 
        tracks={searchResult} 
        onAddTrack={addTrack} 
        isLoading={isLoading}
        />

        <TrackList 
          tracks={trackList} 
          onRemoveTrack={removeTrack} 
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}/>
      </div>
      
    </div>
  );
}

export default App;
