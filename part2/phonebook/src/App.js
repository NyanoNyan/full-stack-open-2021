import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const inputChange = (event) => {
    setNewName(event.target.value);
  };
  
  const phoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const noteObj = {
      name: newName,
    };

    // Checks for duplication using conditional (ternary) operator
    persons.includes(newName)
    ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(noteObj));

    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={inputChange}/>
        </div>
        <div>number: <input value={newPhone} onChange={phoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>
          {person.name}
        </div>
        )}
    </div>
  )
}

export default App