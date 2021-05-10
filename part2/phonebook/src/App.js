import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ searchItem, setSearchItem ] = useState('');
  
  useEffect(() => {
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
  }, [])

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

    
    // Updates number if name is already in the list
    if (persons.filter(e => e.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      if (window.confirm(`${newName} is already to phonebook, replace the old number with a new one?`)) {
        const personUpdateData = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        const changedNote = { ...personUpdateData, number: newPhone};
  
        noteService
          .updatePost(personUpdateData.id, changedNote)
          .then(returnedNote => {
            setPersons(persons.map(person => person.id != personUpdateData.id ? person: returnedNote))
          })
      }

        // Adds new note
    } else {
      const noteObj = {
        name: newName,
        number: newPhone,
      };
      // Checks for duplication using conditional (ternary) operator
      persons.includes(newName)
      ? alert(`${newName} is already added to phonebook`) : 
      noteService
        .create(noteObj)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote));
          setNewName('');
          setNewPhone('');
        });
    } 

  };

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      noteService
      .deletePost(person.id)
      .then(returnedNote => {
        setPersons(persons.filter(listPerson => listPerson.id !== person.id))
      })
      .catch(error => {
        console.log('Some error happening here')
      })
    };

  };

  // Search functionality based on name (case insensitive using ternary operator)
  let namesToShow = searchItem.length === 0
  ? persons
  : persons.filter(item => item.name.toLowerCase().includes(searchItem.toLowerCase()));


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchItem={searchItem} 
        searchChange={searchChange}
      />

      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        inputChange={inputChange}
        newPhone={newPhone}
        phoneChange={phoneChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons 
        namesToShow={namesToShow}
        deletePerson={deletePerson}
      />
        
    </div>
  )
}

export default App