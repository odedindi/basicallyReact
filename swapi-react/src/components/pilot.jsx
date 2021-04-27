import React from 'react';


const Pilot = ({ pilot, addPilotToFavorites }) => {

    return(
        <>
            <button onClick={ addPilotToFavorites }>{ pilot.name }</button>
        </>
    );
};

export default Pilot;
