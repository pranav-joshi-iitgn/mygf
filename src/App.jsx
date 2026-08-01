import React, { useState, useEffect } from 'react';
import MediaCarousel from './components/MediaCarousel';
import Poem from './components/Poem'; // Import the new component

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
      <h1 style={{ textAlign: 'center', color: '#4a4a4a' }}>Our Memories</h1>
      
      <MediaCarousel items={mediaItems} />
      
      {/* Add a divider and the Poem component */}
      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '60px 0' }} />
      <h2 style={{ textAlign: 'center', color: '#4a4a4a', fontFamily: 'Georgia, serif' }}>A Poem for You</h2>
      <Poem />
      
    </div>
  );
}

export default App;