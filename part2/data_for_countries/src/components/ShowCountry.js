import React from 'react';

const ShowCountry = ( {newFilterd} ) => {
    let finalMsg;

    // Conditions depending on filtered countries
    if (newFilterd.length === 250) {
        finalMsg;
    
      } else if (newFilterd.length > 10) {
        finalMsg = (
          <div>
            <p>Too many matches, specify another filter</p>
          </div>
        );
    
      } else if (newFilterd.length <=10 && newFilterd.length > 1){
        finalMsg = (
          <div>
            {newFilterd.map(item => 
              <p key={item.name}>{item.name}</p>
            )}
          </div>
        );
    
      } else if (newFilterd.length === 1){
        finalMsg = (
          <div>
            <h2>{newFilterd[0].name}</h2>
            <p>capital {newFilterd[0].capital}</p>
            <p>population {newFilterd[0].population}</p>
            <h4>languages </h4>
            <ul>
              {newFilterd[0].languages.map(item => 
                <li key={`${item.name}`}>{item.name}</li>
                )}
            </ul>
            <img 
              src={newFilterd[0].flag} 
              alt="country Logo"
              height="150"
              width="200"
            />
          </div>
        )
      };

    return (
        <div>
            {finalMsg}
        </div>
    );
};

export default ShowCountry;