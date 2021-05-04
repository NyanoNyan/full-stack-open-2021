import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ searchItem, setSearchItem ] = useState('');
  
  const inputChange = (event) => {
    setNewName(event.target.value);
  };
  
  const phoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const searchChange = (event) => {
    setSearchItem(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const noteObj = {
      name: newName,
      number: newPhone,
    };

    // Checks for duplication using conditional (ternary) operator
    persons.includes(newName)
    ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(noteObj));

    setNewName('');
    setNewPhone('');
  };

  // Search functionality based on name (case insensitive using ternary operator)
  let namesToShow = searchItem.length === 0
  ? persons
  : persons.filter(item => item.name.toLowerCase().includes(searchItem.toLowerCase()));


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <label>filter shown with: </label>
        <input value={searchItem} onChange={searchChange}/>
      </div>
      <h2>add a new</h2>
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
      {namesToShow.map(person => 
        <div key={person.name}>
          {person.name}
          {' '}
          {person.number}
        </div>
        )}
        
    </div>
  )
}

export default App