// components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="border border-gray-300 rounded-lg  px-4 py-2 mr-2"
      />
      <button
        type="submit"
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-lg "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
