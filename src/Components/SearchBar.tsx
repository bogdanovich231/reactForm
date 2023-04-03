import React, { useState, useEffect } from 'react';
import BookCard from '../Components/BookCard';
import axios from 'axios';

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

interface BookData {
  items: Book[];
}

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [bookData, setBookData] = useState<Book[]>([]);

  function searchBook(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      axios
        .get<BookData>(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyAngCvIO3JcuAlZxMsdM8SAimzwGUgdmG4&maxResults=20`
        )
        .then((res) => setBookData(res.data.items))
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    localStorage.setItem('search', search);
  }, [search]);

  return (
    <>
      <div className="search_book">
        <div className="search_input">
          <input
            type="text"
            placeholder="Search your Book"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={searchBook}
          />
          <button className="search"></button>
        </div>
      </div>
      <div className="container_books">
        <BookCard books={bookData} />
      </div>
    </>
  );
};

export default SearchBar;
