import React, { useState, useEffect } from 'react';
import './Poem.css';

export default function Poem() {
  const [stanzas, setStanzas] = useState([]);

  useEffect(() => {
    // Fetch the text file using the base URL logic we set up earlier
    fetch(`${import.meta.env.BASE_URL}poem.txt`)
      .then((response) => response.text())
      .then((text) => {
        // 1. Split the text into an array of lines
        // 2. Trim whitespace from each line
        // 3. Filter out any completely empty lines
        const lines = text
          .split('\n')
          .map(line => line.trim())
          .filter(line => line !== '');

        // Group the lines into chunks of 4 (stanzas)
        const groupedStanzas = [];
        for (let i = 0; i < lines.length; i += 4) {
          groupedStanzas.push(lines.slice(i, i + 4));
        }
        
        setStanzas(groupedStanzas);
      })
      .catch((error) => console.error("Error loading poem:", error));
  }, []);

  if (stanzas.length === 0) {
    return <div className="poem-loading">Whispering sweet nothings...</div>;
  }

  return (
    <div className="poem-wrapper">
      <div className="poem-container">
        {stanzas.map((stanza, index) => (
          <div className="stanza" key={index}>
            {stanza.map((line, lineIndex) => (
              <p className="poem-line" key={lineIndex}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <p className="scroll-indicator">Scroll to read &#8595;</p>
    </div>
  );
}