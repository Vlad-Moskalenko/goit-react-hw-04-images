import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <SearchBar onSubmit={query => setSearchQuery(query)} />
      <ToastContainer autoClose={3000} />
      <ImageGallery searchQuery={searchQuery} />
    </div>
  );
}
