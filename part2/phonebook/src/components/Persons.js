import React from 'react';

const Persons = ( {namesToShow, deletePerson} ) => {
    return (
        <div>
            {namesToShow.map(person => 
                <div key={person.name}>
                    {person.name}
                    {' '}
                    {person.number}
                    <button onClick={() => deletePerson(person)}>delete</button>
                </div>
                )}
        </div>
    );
};

export default Persons;