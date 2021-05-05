import React, { useEffect, useState } from 'react';
import axios from 'axios'

const App = () => {

  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState();

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

  console.log(countryData);


  return (
    <div>
      <label>find countries </label>
      <input value={countryName} onChange={countryValueChange} />
    </div>
  )
}

export default App