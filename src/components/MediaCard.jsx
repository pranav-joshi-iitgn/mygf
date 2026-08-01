import React, { useRef, useEffect } from 'react';
import './MediaCard.css';

export default function MediaCard({ item, isActive }) {
  let { src, caption } = item;
  const mediaRef = useRef(null); // Reference to control the media element

  // Listen for changes to the isActive prop
  useEffect(() => {
    if (!mediaRef.current) return;

    // Control Local Video
    if (src.endsWith('.mp4')) {
      if (isActive) {
        // Browsers might block autoplay if the user hasn't interacted with the page yet, 
        // so we catch the error to prevent the console from complaining.
        mediaRef.current.play().catch(e => console.log("Autoplay blocked until user interaction", e));
      } else {
        mediaRef.current.pause();
      }
    } 
    // Control YouTube Video
    else if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const command = isActive ? 'playVideo' : 'pauseVideo';
      // We send a message to the iframe to play/pause using the YouTube API
      mediaRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }), 
        '*'
      );
    }
  }, [isActive, src]);

  const renderMedia = () => {
    if (src.includes('drive.google.com')) {
      const embedSrc = src.replace('/view', '/preview');
      return (
        <iframe src={embedSrc} className="media-element" allow="autoplay" allowFullScreen title={caption} />
      );
    } 

    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      let embedSrc = src;
      if (src.includes('watch?v=')) {
        embedSrc = src.replace('watch?v=', 'embed/');
      } else if (src.includes('youtu.be/')) {
        embedSrc = src.replace('youtu.be/', 'youtube.com/embed/');
      } else if (src.includes('/shorts/')) {
        embedSrc = src.replace('/shorts/', '/embed/');
      }

      // Add enablejsapi=1 so we can pause/play it programmatically
      embedSrc += embedSrc.includes('?') ? '&enablejsapi=1' : '?enablejsapi=1';

      return (
        <iframe
          ref={mediaRef} // Attach ref here
          src={embedSrc}
          className="media-element"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={caption}
        ></iframe>
      );
    }

    // Safety check for local files: ensure they use the correct base URL for GitHub Pages
    if (!src.startsWith('http')) {
      // Strip any accidental leading slashes from the JSON data, then append the base URL
      const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
      src = import.meta.env.BASE_URL + cleanSrc;
    }

    if (src.endsWith('.mp4')) {
      return (
        <video 
          ref={mediaRef} // Attach ref here
          src={src} 
          controls 
          className="media-element"
          preload="metadata"
        />
      );
    } 
    
    return (
      <img src={src} alt={caption} className="media-element" loading="lazy" />
    );
  };

  return (
    <div className="media-card">
      <div className="media-wrapper">
        {renderMedia()}
      </div>
      {caption && <p className="media-caption">{caption}</p>}
    </div>
  );
}