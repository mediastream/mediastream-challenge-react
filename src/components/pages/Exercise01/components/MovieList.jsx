import React from "react";

const MovieList = ({ movies, addToCart }) => {
  return (
    <div className='movies__list'>
      <ul>
        {movies.map((movie) => (
          <li className='movies__list-card' key={movie.id}>
            <ul>
              <li>ID: {movie.id}</li>
              <li>Name: {movie.name}</li>
              <li>Price: ${movie.price}</li>
            </ul>
            <button onClick={() => addToCart(movie)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
