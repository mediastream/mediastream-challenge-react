import React from 'react'

const MovieList = ({ movies }) => {
  return (
    <ul className="movie-library__list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-library__card">
          <img src={movie.posterUrl} alt={movie.title} />
          <ul>
            <li className='title'>{movie.title}</li>
            <li>{movie.genres.join(', ')}</li>
            <li>Year: {movie.year}</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default MovieList
