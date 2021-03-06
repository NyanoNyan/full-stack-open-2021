import React, { useEffect, useState } from 'react';
import axios from 'axios'
import SearchBar from './components/SearchBar';
import ShowCountry from './components/ShowCountry';
import ShowWeather from './components/ShowWeather';

const App = () => {

  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState([]);
  // For showing countries with button click
  const [isBtnClick, setIsBtnClick] = useState(false);
  const [showData, setShowData] = useState();

  const [weatherData, setWeatherData] = useState([]);

  const countryValueChange = (event) => {
    setCountryName(event.target.value);
    setIsBtnClick(false);
  };

  // Loading up the country data
  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountryData(response.data);
        });
  }, []);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const tempUnit = "metric";

    // Conditional for search on text field vs button click
    if (newFilterd.length === 1 && isBtnClick === false) {
        const location = newFilterd[0].capital;
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=${tempUnit}`)
            .then(response => {
               setWeatherData(response.data);
            });
    } else if (newFilterd.length > 1 && isBtnClick === true) {
        const location = newFilterd[0].capital;
          axios
              .get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=${tempUnit}`)
              .then(response => {
                setWeatherData(response.data);
              });
    }

}, [countryName, isBtnClick])

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
        isBtnClick = {isBtnClick}
        setIsBtnClick = {setIsBtnClick}
        showData = {showData}
        setShowData = {setShowData}
      />
      <ShowWeather 
        newFilterd={newFilterd}
        isBtnClick={isBtnClick}
        weatherData={weatherData}
      />
    </div>
  )
}

export default App

// When only one country show all the data
// When 10 and fewer and more than 1, show just the names of the matching countries.
// When more than 10, user is asked to be more specific.