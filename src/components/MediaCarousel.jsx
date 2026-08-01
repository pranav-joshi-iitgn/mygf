import React, { useState } from 'react';
import MediaCard from './MediaCard';
import './MediaCarousel.css';

export default function MediaCarousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return <div className="carousel-loading">Loading memories...</div>;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));
  };

  // Math: 
  // - We want exactly 3 items on screen, so each item is 33.333% wide.
  // - To center the first item (Index 0), we push the track right by exactly 33.333%.
  // - Every time we click Next, we shift left by 33.333%.
  const transformValue = `translateX(calc(33.333% - ${currentIndex * 33.333}%))`;

  return (
    <div className="carousel-container">
      <button 
        className="carousel-btn left-btn" 
        onClick={handlePrev} 
        disabled={currentIndex === 0}
      >
        &#8592;
      </button>

      <div className="carousel-viewport">
        <div 
          className="carousel-track" 
          style={{ transform: transformValue }}
        >
          {items.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <div 
                className={`carousel-item ${isActive ? 'active' : ''}`} 
                key={item.src + index}
              >
                {/* We pass the isActive prop down so the card knows when to play/pause */}
                <MediaCard item={item} isActive={isActive} />
              </div>
            );
          })}
        </div>
      </div>

      <button 
        className="carousel-btn right-btn" 
        onClick={handleNext} 
        disabled={currentIndex === items.length - 1}
      >
        &#8594;
      </button>
    </div>
  );
}