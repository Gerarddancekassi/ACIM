import React from 'react';

function MessageBox({ text, show }) {
  // The CSS for .message-box and .message-box.show (opacity transition)
  // is expected to be in src/index.css
  return (
    <div className={`message-box ${show ? 'show' : ''}`}>
      {text}
    </div>
  );
}

export default MessageBox;
