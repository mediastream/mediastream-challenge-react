import React from 'react'

import { movies } from './movies'

const MovieList = ({ saveOnCart }) => {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id} className="movies__list-card">
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
          <button onClick={() => saveOnCart(movie)}>
            Add to cart
          </button>
        </li>
      ))}
    </ul>
  )
}

export default MovieList
