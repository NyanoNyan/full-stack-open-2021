import React from 'react';

const PersonForm = ( {newName, newPhone, inputChange, phoneChange, addPerson} ) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={inputChange}/>
            </div>
            <div>number: <input value={newPhone} onChange={phoneChange}/></div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )};

export default PersonForm;