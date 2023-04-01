import React, { useState, useEffect } from 'react';

interface Book {
  volumeInfo: {
    imageLinks: {
      smallThumbnail: string;
    };
    title: string;
  };
  saleInfo: {
    listPrice: {
      amount: number;
    };
  };
}

interface Props {
  books: Book[];
}

const BookCard: React.FC<Props> = ({ books }) => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    const newThumbnails: string[] = [];
    const newCounts: number[] = [];

    books.forEach((book) => {
      const thumbnail = book.volumeInfo.imageLinks?.smallThumbnail;
      const count = book.saleInfo.listPrice?.amount;

      if (thumbnail && count) { 
        newThumbnails.push(thumbnail);
        newCounts.push(count);
      }
    });

    setThumbnails(newThumbnails);
    setCounts(newCounts);
  }, [books]);

  return (
    <>
      {thumbnails.map((thumbnail, index) => (
        <div key={books[index].volumeInfo.title} className="book_card">
          <img src={thumbnail} alt={books[index].volumeInfo.title} />
          <div className="book_card_info">
            <h2 className="book_card_title">{books[index].volumeInfo.title}</h2>
            {counts[index] && <p className="book_card_count">&#36;{counts[index]}</p>}
          </div>
        </div>
      ))}
    </>
  );
};

export default BookCard;
