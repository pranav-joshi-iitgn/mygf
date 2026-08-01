import React, { useState, useEffect } from 'react';

const playlist = [
  "l-FV9ZOp4xw",
  "37OFgwtS2pM",
  "gnwiwgdmeZI",
  "qdzXo5jhngg"
];

function MusicPlayer() {
  const [currentSongId, setCurrentSongId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Pick a random song ID
  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    setCurrentSongId(playlist[randomIndex]);
  };

  useEffect(() => {
    playRandomSong();
  }, []);

  // Listen for the first pointerdown anywhere on the screen
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasStarted) {
        setIsPlaying(true);
        setHasStarted(true);
      }
    };

    // The { once: true } option ensures this listener automatically removes itself after firing once
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
  }, [hasStarted]);

  return (
    <div 
      style={{
        position: 'fixed', // Keeps it in place while scrolling
        top: '15px',       // Positioned at top-left
        left: '15px',
        zIndex: 1000,      // Ensures it stays above other content
        opacity: isHovered ? 1 : 0.4, // Less opaque unless hovered
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        transform: isHovered ? 'scale(0.9)' : 'scale(0.75)', // Slightly smaller overall, expands slightly on hover
        transformOrigin: 'top left'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevents button clicks from bubbling up
          setIsPlaying(!isPlaying);
          setHasStarted(true); // Ensure manual clicks also mark it as started
        }}
        style={{ 
          padding: '8px 16px', 
          borderRadius: '20px', 
          border: '1px solid #ffb6c1', 
          cursor: 'pointer', 
          background: '#fff0f5',
          color: '#4a4a4a',
          fontFamily: 'Georgia, serif',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {isPlaying ? '⏸ Pause' : '🎵 Play'}
      </button>

      {/* --- Negative Z-Index Iframe --- */}
      {isPlaying && currentSongId && (
        <iframe
          width="100"
          height="100"
          src={`https://www.youtube.com/embed/${currentSongId}?autoplay=1&controls=0&showinfo=0&autohide=1`}
          title="Background Music"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -9999,
            opacity: 0,
            pointerEvents: 'none'
          }}
        ></iframe>
      )}
    </div>
  );
}

export default MusicPlayer;