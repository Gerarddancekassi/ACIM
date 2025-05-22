import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the API module if it's directly imported and called in App.js during render,
// or if initial useEffect makes a call. For this App, it's not strictly necessary
// for basic rendering tests as the API call is user-triggered.
// jest.mock('./apiService'); // Assuming you might have an apiService.js later

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Check for a high-level element or text that indicates App has rendered.
    // The star logo placeholder is a good candidate.
    expect(screen.getByText(/Gold Star Logo Placeholder/i)).toBeInTheDocument();
  });

  test('renders VerseDisplay with initial content', () => {
    render(<App />);
    // Check for the initial title or content of VerseDisplay
    expect(screen.getByText('A Course in Miracles')).toBeInTheDocument();
    expect(screen.getByText('Ask a question to receive a paragraph from A Course in Miracles.')).toBeInTheDocument();
  });

  test('renders InputArea with textarea and button', () => {
    render(<App />);
    // Check for the textarea (e.g., by placeholder) and the button
    expect(screen.getByPlaceholderText(/Enter verse reference/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Verse/i })).toBeInTheDocument();
  });

  test('renders MessageBox', () => {
    render(<App />);
    // MessageBox is initially empty but the div should be there.
    // It's identified by className="message-box". We can look for an element with this class.
    // Note: queryByRole or queryByTestId might be better if it had a role or id.
    // For now, we can check if it's empty or rely on its structure if specific enough.
    // Since it's just <div class="message-box"></div> when empty,
    // and testing-library focuses on user-visible elements,
    // we might check that it *doesn't* have visible text initially unless 'show' is true.
    // Or, we can assign a test-id if we need to select it reliably when empty.
    // For this case, let's assume it's enough that no error occurs and other components are present.
    // A more robust test would involve giving MessageBox a test-id.
    // For now, we'll ensure it doesn't crash. If MessageBox had a distinct role or initial hidden text, we could use that.
    // The div itself is there, even if empty. Let's assume its presence is covered by the no-crash test.
    // A more specific test would be:
    const messageBox = document.querySelector('.message-box');
    expect(messageBox).toBeInTheDocument(); // Checks if the DOM element exists
    expect(messageBox.textContent).toBe(''); // Initially empty
  });
});
