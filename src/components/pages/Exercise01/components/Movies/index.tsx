import React from 'react'
import { Movie } from '../../interfaces';

interface Props {
  movies: Movie[];
  addMovie: (item: Movie) => void
}
const Movies = ({ movies, addMovie } : Props) => {
  return (
    <div className="movies__list">
    <ul>
      {movies.map(movie => (
        <li className="movies__list-card" key={movie.id}>
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
          <button onClick={() => addMovie(movie)}>
            Add to cart
          </button>
        </li>
      ))}
    </ul>
  </div>
  )
}
export default Movies
