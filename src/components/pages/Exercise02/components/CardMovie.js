import React from 'react'

export default function CardMovie({movie}) {
  return (
    <li key={movie.id} className="movie-library__card">
      <img src={movie.posterUrl} alt={movie.title} />
      <ul>
        <li>ID: {movie.id}</li>
        <li>Title: {movie.title}</li>
        <li>Year: {movie.year}</li>
        <li>Runtime: {movie.runtime}</li>
        <li>Genres: {movie.genres.join(', ')}</li>
      </ul>
    </li>
  )
}
