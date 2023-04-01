import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SearchBar from '../Components/SearchBar';
import '@testing-library/jest-dom';

jest.mock('axios');

test('SearchBar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search input', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const input = getByPlaceholderText('Search your Book');
    expect(input).toBeInTheDocument();
  });

  it('should update the search input value on change', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const input = getByPlaceholderText('Search your Book') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('should make an API call on enter key press', async () => {
    const mockedGet = axios.get as jest.MockedFunction<typeof axios.get>;
    mockedGet.mockResolvedValueOnce({ data: { items: [] } });
    const { getByPlaceholderText } = render(<SearchBar />);
    const input = getByPlaceholderText('Search your Book');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.googleapis.com/books/v1/volumes?q=test&key=AIzaSyAngCvIO3JcuAlZxMsdM8SAimzwGUgdmG4&maxResults=20'
    );
  });
});
