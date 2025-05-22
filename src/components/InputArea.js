import React from 'react';

function InputArea({ question, setQuestion, onGetVerseClick, isLoading }) {
  return (
    <div className="input-area">
      <textarea
        placeholder="Enter verse reference (e.g., T1.1.1)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={isLoading} // Optionally disable textarea when loading
      />
      <button onClick={onGetVerseClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Verse'}
      </button>
    </div>
  );
}

export default InputArea;
