import React from 'react';

const MovieComponent = ({ movie, onClick }) => {
  return (
    <li className='movies__list-card'>
      <ul>
        <li>ID: {movie.id}</li>
        <li>Name: {movie.name}</li>
        <li>Price: ${movie.price}</li>
      </ul>
      <button onClick={onClick}>Add to cart</button>
    </li>
  );
};

export default MovieComponent;
