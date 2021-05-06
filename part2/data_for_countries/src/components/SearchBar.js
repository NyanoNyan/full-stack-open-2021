import React from 'react';

const SearchBar = ( {countryName, countryValueChange} ) => {
    return (
        <div>
            <label>find countries </label>
            <input value={countryName} onChange={countryValueChange} />
        </div>

    );
};

export default SearchBar;