import React from 'react';
import { render, screen } from '@testing-library/react';
import BookCard from '../Components/BookCard';

describe('BookCard component', () => {
  const mockBooks = [
    {
      volumeInfo: {
        imageLinks: {
          smallThumbnail: 'https://example.com/book1.jpg',
        },
        title: 'Book 1',
      },
      saleInfo: {
        listPrice: {
          amount: 9.99,
        },
      },
    },
    {
      volumeInfo: {
        imageLinks: {
          smallThumbnail: 'https://example.com/book2.jpg',
        },
        title: 'Book 2',
      },
      saleInfo: {
        listPrice: {
          amount: 19.99,
        },
      },
    },
  ];

  it('renders the correct number of book cards', () => {
    render(<BookCard books={mockBooks} />);
    const bookCards = screen.getAllByRole('img');
    expect(bookCards).toHaveLength(2);
  });

  it('renders the book title correctly', () => {
    render(<BookCard books={mockBooks} />);
    const bookTitles = screen.getAllByText(/Book \d/);
    expect(bookTitles).toHaveLength(2);
  });
});
