import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown'; // 1. Import the package
import './Quotes.css';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}quotes.json`)
      .then((response) => response.json())
      .then((data) => setQuotes(data))
      .catch((error) => console.error("Error loading quotes:", error));
  }, []);

  const changeQuote = useCallback((newIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 400);
  }, []);

  useEffect(() => {
    let timeout;
    if (showNav) {
      timeout = setTimeout(() => {
        setShowNav(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showNav, currentIndex]);

  useEffect(() => {
    let interval;
    if (!showNav && quotes.length > 0) {
      interval = setInterval(() => {
        changeQuote((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [showNav, quotes.length, changeQuote]);

  const handleContainerClick = () => {
    setShowNav(true);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (isFading) return;
    const newIndex = currentIndex === 0 ? quotes.length - 1 : currentIndex - 1;
    changeQuote(newIndex);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (isFading) return;
    const newIndex = (currentIndex + 1) % quotes.length;
    changeQuote(newIndex);
  };

  if (quotes.length === 0) {
    return <div className="quotes-loading">Loading memories...</div>;
  }

  const currentQuote = quotes[currentIndex];

  return (
    <div className="quotes-wrapper">
      <div className="quotes-container" onClick={handleContainerClick}>
        
        <div className={`quotes-nav ${showNav ? 'visible' : 'hidden'}`}>
          <button className="quote-btn left-btn" onClick={handlePrev}>&#8592;</button>
          <button className="quote-btn right-btn" onClick={handleNext}>&#8594;</button>
        </div>

        <div className={`quote-content ${isFading ? 'fading' : ''}`}>
          {/* 2. Wrap the message in ReactMarkdown. 
              We changed it to a <div> because ReactMarkdown generates <p> tags automatically */}
          <div className="quote-message">
            <ReactMarkdown>{currentQuote.message}</ReactMarkdown>
          </div>
          <p className="quote-meta">
            <span className="quote-sender">— {currentQuote.sender}</span>
            <span className="quote-date">{currentQuote.date}</span>
          </p>
        </div>

      </div>
      {/* <p className="quotes-hint">Tap to navigate</p> */}
    </div>
  );
}