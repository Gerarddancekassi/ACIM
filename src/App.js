import React, { useState, useEffect } from 'react';
import './App.css';
import VerseDisplay from './components/VerseDisplay';
import InputArea from './components/InputArea';
import MessageBox from './components/MessageBox';
// AuraStar and GradientBg are not imported or rendered here
// as their elements are already in public/index.html

// IMPORTANT: Embedding API keys directly in client-side code is insecure for production.
// This should be handled via a backend proxy or environment variables in a real-world scenario.
const API_KEY = "AIzaSyB3wOuYSy935vclz4OpVNzw-qegFl2z7pY"; // Your API key

async function getVerseFromACIM(questionText) {
  try {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: `Given the text from 'A Course in Miracles', find a relevant paragraph that best answers the question: "${questionText}". Provide only the paragraph. Do not include any source information, introductory or concluding remarks.` }] });

    const payload = {
      contents: chatHistory,
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`; // Using gemini-pro as gemini-2.0-flash might not be available or correct

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API response error data:", errorData);
      throw new Error(`API error: ${errorData.error ? errorData.error.message : JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      let verse = result.candidates[0].content.parts[0].text.trim();
      const sourceRegex = /(Chapter\s+\w+,\s+Section\s+\w+,\s+Paragraph\s+\w+\.?)/i;
      verse = verse.replace(sourceRegex, '').trim();
      verse = verse.replace(/(\s*[\.,;:]\s*)$/, '').trim();
      return verse; // Return the verse text directly
    } else {
      console.log("API response structure unexpected or content missing.", result);
      // Check for safety ratings or other reasons for no content
      if (result.candidates && result.candidates.length > 0 && result.candidates[0].finishReason) {
        throw new Error(`Content generation stopped due to: ${result.candidates[0].finishReason}. No paragraph found.`);
      }
      throw new Error("No paragraph found. The model might not have generated content or the structure was unexpected.");
    }
  } catch (error) {
    console.error("Error fetching verse:", error);
    throw error; // Re-throw the error to be caught by handleGetVerseClick
  }
}


function App() {
  const [question, setQuestion] = useState('');
  const [verseContent, setVerseContent] = useState('Ask a question to receive a paragraph from A Course in Miracles.');
  const [displayTitle, setDisplayTitle] = useState('A Course in Miracles');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', show: false });

  const handleGetVerseClick = async () => {
    if (!question.trim()) {
      setMessage({ text: 'Please enter a question or topic.', show: true });
      setTimeout(() => setMessage({ text: '', show: false }), 3000);
      return;
    }

    setIsLoading(true);
    setMessage({ text: 'Searching for a paragraph...', show: true });
    setDisplayTitle('Searching...');
    setVerseContent('');

    try {
      const fetchedVerse = await getVerseFromACIM(question);
      setDisplayTitle('Your Paragraph:');
      setVerseContent(fetchedVerse);
      setMessage({ text: 'Paragraph found!', show: true });
    } catch (error) {
      console.error("handleGetVerseClick error:", error);
      setDisplayTitle('Error');
      setVerseContent("Failed to retrieve paragraph. Please try again later.");
      setMessage({ text: `Error: ${error.message || "An unknown error occurred."}`, show: true });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage({ text: '', show: false });
      }, 3000);
    }
  };

  return (
    <>
      {/* Star Logo Placeholder - using a div as the image is missing */}
      <div className="star-logo" style={{ textAlign: 'center', padding: '1rem', fontWeight: 'bold' }}>
        Gold Star Logo Placeholder
      </div>

      <VerseDisplay displayTitle={displayTitle} verseContent={verseContent} />
      <InputArea
        question={question}
        setQuestion={setQuestion}
        onGetVerseClick={handleGetVerseClick}
        isLoading={isLoading}
      />
      <MessageBox text={message.text} show={message.show} />
    </>
  );
}

export default App;
