import React from "react";
import "./SearchBar.css";

function SearchBar({ inputValue, handleInputChange }) {
  return (
    <header className="headerContainer">
      <input
        className="inputContainer"
        type="text"
        placeholder="Search by name, email or role"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </header>
  );
}

export default SearchBar;
