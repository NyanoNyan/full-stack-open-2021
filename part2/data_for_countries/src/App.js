import React, { useEffect, useState } from 'react';
import axios from 'axios'
import SearchBar from './components/SearchBar';
import ShowCountry from './components/ShowCountry';

const App = () => {

  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState([]);

  const countryValueChange = (event) => {
    setCountryName(event.target.value);
  };

  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountryData(response.data);
        });
  }, []);

  // countryData.map(item => console.log(item.name))

  const newFilterd = countryData.filter(country => country.name.toLowerCase().includes(countryName.toLowerCase()));
  
  return (
    <div>
      <SearchBar
        countryName={countryName}
        countryValueChange={countryValueChange}
      />
      <ShowCountry
        newFilterd = {newFilterd}
      />
    </div>
  )
}

export default App

// When only one country show all the data
// When 10 and fewer and more than 1, show just the names of the matching countries.
// When more than 10, user is asked to be more specific.