import React, { useState } from 'react';
import './styles.scss';
import { baseUrl, getData } from './components/asyncFech';
import Films from './components/films';

function App() {

  const [ films, setFilms ] = useState([]);
  const [ showFilms, setShowFilms ] = useState(false);

  const onStartHandler = () => {
    getData(`${ baseUrl }films`)
    .then((data) => setFilms(data.results))
    .then(setShowFilms(!showFilms))
  }

  return (
    <>
      <div className="App" >
        <div className='header'>
          <h1 className='headline'> STAR WARS API</h1>
          <h2 className='subheader'>Please Choose your favorite pilots</h2>
        </div>
          {
            !showFilms && <button className='startButton' onClick={ onStartHandler }>Start</button> 
          }
        <div className="mainContent" >
          { 
            showFilms && <Films theFilms={ films } /> 
          }
        </div>
      </div>
    </>
  );
};

export default App;
