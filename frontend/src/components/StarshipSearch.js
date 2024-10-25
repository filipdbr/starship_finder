import React, { useState, useEffect } from 'react';
import './StarshipSearch.css';
import axios from 'axios'; // For sending HTTP requests

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

  // Function to save the query in MongoDB
  const saveQuery = (queryText) => {
    axios.post('/api/queries', queryText)
      .then(response => {
        console.log('Query saved:', queryText);
      })
      .catch(error => {
        console.error('Error saving query:', error);
      });
  };

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
    handleSearch(name); // Perform the search immediately on click

    // Save the query when the user clicks a suggestion
    saveQuery(name);
  };

  const handleSearch = (searchQuery) => {
    const queryToUse = searchQuery !== undefined ? searchQuery : query;
    const results = starships.filter((starship) =>
      starship.name.toLowerCase().includes(queryToUse.toLowerCase())
    );
    setSearchResults(results);
    setSuggestions([]);

    // Save the query when the user presses enter
    if (!searchQuery) {
      saveQuery(queryToUse);
    }
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
                <p><strong>Cost in Credits:</strong> {starship.costInCredits}</p>
                <p><strong>Length:</strong> {starship.length}</p>
                <p><strong>Crew:</strong> {starship.crew}</p>
                <p><strong>Passengers:</strong> {starship.passengers}</p>
                <p><strong>Max Atmosphering Speed:</strong> {starship.maxAtmospheringSpeed}</p>
                <p><strong>Hyperdrive Rating:</strong> {starship.hyperdriveRating}</p>
                <p><strong>Cargo Capacity:</strong> {starship.cargoCapacity}</p>
                <p><strong>Consumables:</strong> {starship.consumables}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StarshipSearch;
