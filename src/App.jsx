import React, { useState, useEffect } from 'react';
import MediaCarousel from './components/MediaCarousel';

function App() {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    // Dynamically prepends '/mygf/' so it fetches from the correct sub-directory
    fetch(`${import.meta.env.BASE_URL}media.json`)
      .then((response) => response.json())
      .then((data) => setMediaItems(data))
      .catch((error) => console.error("Error loading media:", error));
  }, []);
 
  return (
    <div style={{ padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4a4a4a' }}>Our Memories</h1>
      <MediaCarousel items={mediaItems} />
    </div>
  );
}

export default App;