import React from 'react';

export const Movies = ({movie, handleAddCart}) => {

    return (
        <li className="movies__list-card">
            <ul>
                <li>
                    ID: {movie.id}
                </li>
                <li>
                    Name: {movie.name}
                </li>
                <li>
                    Price: ${movie.price}
                </li>
            </ul>
            <button onClick={ () => handleAddCart({...movie, quantity : 1}) }>
                Add to cart
            </button>
        </li>
    )
}
