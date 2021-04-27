import React from 'react';
import { getData } from './asyncFech';

const Starship = ({ starship, setPilotsList }) => {

    const clickStarshipHandler = (event) => {
        event.preventDefault();
        setPilotsList([])
        starship.pilots.map(pilotUrl => 
            getData(pilotUrl)
            .then((data) => setPilotsList((prevData) => [...prevData, data]))
        );
    };

    return(
        <button onClick={ clickStarshipHandler }>
            { starship.name }
        </button>
    )
};

export default Starship;
