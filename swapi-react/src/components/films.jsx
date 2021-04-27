import React, { useEffect, useState } from 'react';
import { getData } from './asyncFech';

// ============ components =================
import Starship from './starship';
import Pilot from './pilot';
import FavoritePilot from './favPilot';
// =========================================


const Films = ({ theFilms }) => {

    const [ films, setFilms ] = useState([]);
    const [ starships, setStarships ] = useState([]);
    const [ pilotsList, setPilotsList ] = useState([]);
    const [ favoritePilotsList, setFavoritePilotsList ] = useState([]);

    useEffect(() => {
        setFilms(theFilms)
    },[films, theFilms])

    const clickFilmHandler = (event) => {
        setStarships([]);
        setPilotsList([]);

        const film = films.filter(film => film.title === event.target.innerText);

        film[0].starships.map(starshipUrl => 
            getData(starshipUrl)
            .then((data) => setStarships((prevData) => [...prevData, data]))            
        );
    };

    const addPilotToFavorites = (pilot) => {

        if (!favoritePilotsList.includes(pilot.name)) {
            setFavoritePilotsList((prevData) => [...new Set([...prevData, pilot.name])]);
        }      
    }

    const removePilotFromFavorites = (pilot) => {

        const newFavorites = favoritePilotsList.filter(name => name !== pilot)
        console.log(newFavorites, pilot)
        setFavoritePilotsList(newFavorites)
    }


    return (
        <>
            <section className='filmsSection'>
                <h2>Films</h2>
                {
                    films.map(film => 
                        <button key={`film${film.episode_id}`} onClick={clickFilmHandler}>
                            { film.title }
                        </button>
                    )
                }    
            </section>
            <section className='starshipSection'>
                <h2>Starships</h2>
                {
                    starships.map((starship) => 
                        <Starship key={ starship.model } starship={ starship } 
                            pilotsList={ pilotsList } setPilotsList={ setPilotsList }
                        />                        
                    )
                }
            </section>
            <section className='pilotsSection'>
                <h2>Pilots</h2>
                {
                    pilotsList.map(pilot =>
                        <Pilot key={ pilot.name } pilot={ pilot }
                            addPilotToFavorites={ () => addPilotToFavorites(pilot) }
                        />
                    )
                }
            </section>
            <section className='favoritePilotsSection'>
                <h2>My Favorite Pilots</h2> 
                {
                    favoritePilotsList.map((favoritepilot, index) => 
                        <FavoritePilot key={ index } pilot={ favoritepilot }
                            removePilotFromFavorites={ () => removePilotFromFavorites(favoritepilot) }
                        /> 
                    )
                }
            </section>
        </>
    );
};

export default Films;