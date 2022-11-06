import './search-bar.css';
import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchQueryChange = e => setSearchQuery(e.target.value.toLowerCase());

  const onFormSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.error('Search query is empty');
    }

    onSubmit(searchQuery);
  };

  return (
    <header className="searchBar">
      <form className="searchForm" onSubmit={onFormSubmit}>
        <button type="submit" className="searchForm-button">
          <FcSearch style={{ width: 30, height: 30 }} />
        </button>

        <input
          onChange={onSearchQueryChange}
          className="searchForm-input"
          value={searchQuery}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
