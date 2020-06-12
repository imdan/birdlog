import React from 'react';

const SearchBar = ({
  search,
  handleChange,
  handleFocus,
  handleBlur,
  clearSearch
}) => {
  const xStyles = search ? 'clearSearch' : 'clearSearch hidden';

  const checkKey = event => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };

  return (
    <div className='searchContainer'>
      search birds:
      <input
        value={search}
        onChange={handleChange}
        onKeyPress={checkKey}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className='search'
      />
      <div className={xStyles} onClick={clearSearch}>
        +
      </div>
    </div>
  );
};

export default SearchBar;
