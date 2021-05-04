import React from 'react';

const Filter = ( {searchItem, searchChange} ) => {
    return (
        <div>
            <label>filter shown with: </label>
            <input value={searchItem} onChange={searchChange}/>
        </div>
    );
};

export default Filter;