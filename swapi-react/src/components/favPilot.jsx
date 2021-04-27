import React from 'react';


const FavoritePilot = ({ pilot, removePilotFromFavorites }) => {
    return(
        <div className='favoritePilot'>
            {pilot}
            <div 
                className='removeFavoritePilotButton' 
                onClick={ removePilotFromFavorites }
            > 
                x
            </div>
        </div>

    );
};

export default FavoritePilot;
