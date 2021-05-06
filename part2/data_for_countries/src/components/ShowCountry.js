import {React} from 'react';

const ShowCountry = ( {newFilterd, showData, setShowData, isBtnClick, setIsBtnClick} ) => {
    let finalMsg;
    const buttonShow = (item) => {
        setIsBtnClick(true);
        // Storing the data needed to show on new ShowOne component
        setShowData(item);
    };

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
                <div key={item.name}>
                    {item.name}
                    {' '}
                    <button onClick={()=> buttonShow(item)}>show</button>
                </div>
            )}
          </div>
        );
    
      } else if (newFilterd.length === 1){
        finalMsg = (
            <ShowOne
                newFilterd = {newFilterd[0]}
            />
        );
      };


    return (
        <div>
            {finalMsg}
            { isBtnClick ?  
            <ShowOne 
              newFilterd={showData}
            />
            : ''}
        </div>
    );
};

const ShowOne = ( {newFilterd} ) => {
    return (
        <div>
            <h2>{newFilterd.name}</h2>
            <p>capital {newFilterd.capital}</p>
            <p>population {newFilterd.population}</p>
            <h4>languages </h4>
            <ul>
            {newFilterd.languages.map(item => 
                <li key={`${item.name}`}>{item.name}</li>
                )}
            </ul>
            <img 
            src={newFilterd.flag} 
            alt="country Logo"
            height="150"
            width="200"
            />
        </div>
    );
};

export default ShowCountry;