import React, { useState, useEffect, useRef } from 'react';

// Replace these with your actual audio file names inside public/audio
const playlist = [...Array(11).keys()].map(i => `track${i + 1}.mp3`);

function MusicPlayer() {
  const [currentSongFile, setCurrentSongFile] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const audioRef = useRef(null);

  // Pick a random song file
  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    setCurrentSongFile(playlist[randomIndex]);
  };

  // Set initial volume once the audio element is mounted (e.g., 30% volume)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05; 
    }
  }, [audioRef.current]);

  // Initialize random song on mount
  useEffect(() => {
    playRandomSong();
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSongFile) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.warn("Playback prevented:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongFile]);

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

      {/* --- Hidden HTML5 Audio Element --- */}
      {currentSongFile && (
        <audio
          ref={audioRef}
          // Relative path for GitHub Pages compatibility (no leading slash)
        //   src={`audio/${currentSongFile}`}
          src={`${import.meta.env.BASE_URL}audio/${currentSongFile}`}
          onEnded={playRandomSong} // Automatically play next random track when finished
          preload="auto"
        />
      )}
    </div>
  );
}

export default MusicPlayer;