import { render, screen, fireEvent } from '@testing-library/react';
import InputArea from './InputArea';

describe('InputArea Component', () => {
  test('renders textarea and button', () => {
    render(<InputArea question="" setQuestion={() => {}} onGetVerseClick={() => {}} isLoading={false} />);
    expect(screen.getByPlaceholderText(/Enter verse reference/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Verse/i })).toBeInTheDocument();
  });

  test('textarea value changes on input', () => {
    const mockSetQuestion = jest.fn();
    render(<InputArea question="" setQuestion={mockSetQuestion} onGetVerseClick={() => {}} isLoading={false} />);
    
    const textarea = screen.getByPlaceholderText(/Enter verse reference/i);
    fireEvent.change(textarea, { target: { value: 'T1.1.1' } });
    
    expect(mockSetQuestion).toHaveBeenCalledWith('T1.1.1');
  });

  test('calls onGetVerseClick when button is clicked', () => {
    const mockGetVerseClick = jest.fn();
    render(<InputArea question="Some question" setQuestion={() => {}} onGetVerseClick={mockGetVerseClick} isLoading={false} />);
    
    const button = screen.getByRole('button', { name: /Get Verse/i });
    fireEvent.click(button);
    
    expect(mockGetVerseClick).toHaveBeenCalledTimes(1);
  });

  test('button is disabled and shows "Loading..." when isLoading is true', () => {
    render(<InputArea question="" setQuestion={() => {}} onGetVerseClick={() => {}} isLoading={true} />);
    
    const button = screen.getByRole('button', { name: /Loading.../i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Also check that the textarea is disabled
    const textarea = screen.getByPlaceholderText(/Enter verse reference/i);
    expect(textarea).toBeDisabled();
  });

  test('button is enabled and shows "Get Verse" when isLoading is false', () => {
    render(<InputArea question="" setQuestion={() => {}} onGetVerseClick={() => {}} isLoading={false} />);
    
    const button = screen.getByRole('button', { name: /Get Verse/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    const textarea = screen.getByPlaceholderText(/Enter verse reference/i);
    expect(textarea).not.toBeDisabled();
  });
});
