import {React} from 'react';

const ShowWeather = ( { newFilterd, isBtnClick, weatherData }) => {
    let dataWeather;
    const isEmpty = weatherData.length === 0;
 
    if ((newFilterd.length === 1 && isBtnClick === false) || (newFilterd.length > 1 && isBtnClick === true)) {
        dataWeather = (
            <WeatherField 
                isEmpty={isEmpty}
                weatherData={weatherData}
            />
        )
    };

    return (
        <>
            {dataWeather}
        </>

    );
};

const WeatherField = ( {isEmpty,weatherData } ) => {

    return (
        <div>
            <h2>Weather in {isEmpty ? '': weatherData.name}</h2>
            <p>Temperature {isEmpty? '': weatherData.main.temp} Celcius</p>
            <img src={ isEmpty?
            '': `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
            <p>wind: {isEmpty ? '': weatherData.wind.speed} </p>
         </div>
    )

}

export default ShowWeather;