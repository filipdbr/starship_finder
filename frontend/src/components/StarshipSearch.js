import React, { useState, useEffect } from 'react';
import './StarshipSearch.css';

function StarshipSearch() {
  const [query, setQuery] = useState('');
  const [starships, setStarships] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch all starships when the component mounts
    fetch('/api/starships')
      .then((response) => response.json())
      .then((data) => setStarships(data))
      .catch((error) => console.error('Error fetching starships:', error));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filteredSuggestions = starships.filter((starship) =>
        starship.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setSuggestions([]);
    // Optionally, update search results immediately
    // handleSearch();
  };

  const handleSearch = () => {
    const results = starships.filter((starship) =>
      starship.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <h1>Starship Search</h1>
      <div className="search-input">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type to search starships..."
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((starship, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(starship.name)}
              >
                {starship.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {searchResults.length > 0 && (
        <div className="results">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((starship, index) => (
              <li key={index}>
                <h3>{starship.name}</h3>
                <p><strong>Model:</strong> {starship.model}</p>
                <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StarshipSearch;
