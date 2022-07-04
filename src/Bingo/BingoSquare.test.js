import { render, screen } from '@testing-library/react';
import BingoSquare from './BingoSquare';

const randomText = Math.random().toString(36).slice(2);

test('Bingo square main text exists', () => {
  render(<BingoSquare getText={() => randomText}/>);
  const linkElement = screen.getByText(randomText);
  expect(linkElement).toBeInTheDocument();
});

test('Bingo square coordinate text exists', () => {
  render(<BingoSquare idText={randomText}/>);
  const linkElement = screen.getByText(randomText);
  expect(linkElement).toBeInTheDocument();
});
