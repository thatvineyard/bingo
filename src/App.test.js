import { render, screen } from '@testing-library/react';
import App from './App';

test('Bingo title exists', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bigo/i);
  expect(linkElement).toBeInTheDocument();
});
