import React, { useState, useEffect } from 'react';
import MediaCarousel from './components/MediaCarousel';
import Poem from './components/Poem';
import Quotes from './components/Quotes'; // Import Quotes
import MusicPlayer from './components/MusicPlayer'; // Import your new component

function App() {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}media.json`)
      .then((response) => response.json())
      .then((data) => setMediaItems(data))
      .catch((error) => console.error("Error loading media:", error));
  }, []);

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'sans-serif' }}>
      {/* Drop in the music player anywhere; fixed positioning handles the rest */}
      <MusicPlayer />

      <h1 style={{ textAlign: 'center', color: '#4a4a4a' }}>Abhu</h1>
      <MediaCarousel items={mediaItems} />
      
      <h2 style={{ textAlign: 'center', color: '#4a4a4a', fontFamily: 'Georgia, serif' }}>Words We Shared</h2>
      <Quotes />

      <h2 style={{ textAlign: 'center', color: '#4a4a4a', fontFamily: 'Georgia, serif' }}>A Poem</h2>
      <Poem />
    </div>
  );
}

export default App;