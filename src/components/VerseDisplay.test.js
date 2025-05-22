import { render, screen } from '@testing-library/react';
import VerseDisplay from './VerseDisplay';

describe('VerseDisplay Component', () => {
  test('renders verse display with title and content', () => {
    const testTitle = "Test Title";
    const testContent = "Test verse content.";
    render(<VerseDisplay displayTitle={testTitle} verseContent={testContent} />);
    
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  test('renders correctly with empty props', () => {
    render(<VerseDisplay displayTitle="" verseContent="" />);
    // Check that it doesn't throw an error and renders empty strings
    // getByText will error if text is not found. We want to ensure it renders the empty strings.
    // It might be better to check for the presence of the h2 and p tags themselves.
    const h2Element = screen.getByRole('heading', { level: 2 });
    const pElement = screen.getByRole('paragraph'); // Not a standard role, better to use getByText('') or check structure

    expect(h2Element).toBeInTheDocument();
    expect(h2Element.textContent).toBe('');
    
    // For the paragraph, since getByText('') can be tricky,
    // let's ensure the parent div contains a p tag and it's empty.
    const verseDisplayArea = h2Element.parentElement;
    const pTags = verseDisplayArea.querySelectorAll('p');
    expect(pTags.length).toBe(1);
    expect(pTags[0].textContent).toBe('');
  });

  test('renders correctly with only title prop', () => {
    const testTitle = "Only Title Here";
    render(<VerseDisplay displayTitle={testTitle} verseContent={undefined} />); // or verseContent=""
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    const verseDisplayArea = screen.getByText(testTitle).parentElement;
    const pTags = verseDisplayArea.querySelectorAll('p');
    expect(pTags.length).toBe(1);
    // React will render `undefined` or `null` as nothing, so textContent will be empty
    expect(pTags[0].textContent).toBe(''); 
  });

  test('renders correctly with only content prop', () => {
    const testContent = "Only content here.";
    render(<VerseDisplay displayTitle={undefined} verseContent={testContent} />);
    expect(screen.getByText(testContent)).toBeInTheDocument();
    const h2Element = screen.getByRole('heading', { level: 2 });
    expect(h2Element).toBeInTheDocument();
    expect(h2Element.textContent).toBe('');
  });
});
