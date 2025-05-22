import React from 'react';

function VerseDisplay({ displayTitle, verseContent }) {
  return (
    <div className="verse-display-area">
      <h2>{displayTitle}</h2>
      <p>{verseContent}</p>
    </div>
  );
}

export default VerseDisplay;
