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
    axios.post('/api/queries', { queryText })  // Send queryText as part of an object
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
            <h2 className="results-header">
                {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'}
            </h2>
            <ul>
            {searchResults.map((starship, index) => (
                <li key={index}>
                <div className="starship-info">
                    <span className="starship-name">{starship.name}</span>
                    <span><strong>Model:</strong> {starship.model}</span>
                    <span><strong>Manufacturer:</strong> {starship.manufacturer}</span>
                </div>
                <div className="starship-details">
                    <span><strong>Cost in Credits:</strong> {starship.costInCredits || 'unknown'}</span>
                    <span><strong>Length:</strong> {starship.length || 'unknown'}</span>
                    <span><strong>Crew:</strong> {starship.crew || 'unknown'}</span>
                    <span><strong>Passengers:</strong> {starship.passengers || 'unknown'}</span>
                    <span><strong>Max Atmosphering Speed:</strong> {starship.maxAtmospheringSpeed || 'unknown'}</span>
                    <span><strong>Hyperdrive Rating:</strong> {starship.hyperdriveRating || 'unknown'}</span>
                    <span><strong>Cargo Capacity:</strong> {starship.cargoCapacity || 'unknown'}</span>
                    <span><strong>Consumables:</strong> {starship.consumables || 'unknown'}</span>
                </div>
                </li>
            ))}
            </ul>
        </div>
        )}


    </div>
  );
}

export default StarshipSearch;
