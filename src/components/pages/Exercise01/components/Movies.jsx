import React from 'react';

const renderMovie = (movie, i, addMovieToCart) => (
  <li key={i} className="movies__list-card">
    <ul>
      <li>ID: {movie.id} </li>
      <li>Name: {movie.name}</li>
      <li>Price: ${movie.price}</li>
    </ul>
    <button onClick={() => addMovieToCart(movie)}>
      Add to cart
    </button>
  </li>
)

export const Movies = ({ movies = [], addMovieToCart }) => {
  return (
    <div className="movies__list">
      <ul>
        {movies.map((movie, i) => renderMovie(movie, i, addMovieToCart) )}
      </ul>
    </div>
  );
};