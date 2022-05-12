/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import { useState } from "react";
import "./assets/styles.css"
import useMovies from "./hooks/useMovies"
import useGenres from "./hooks/useGenres"

const orderByYear = (movies) => {
  return movies.sort((a, b) => {
    return a.year - b.year
  })
}

const filterMovies = (movies, {
  genre,
  order,
}) => {
  let output = []
  if (genre) {
    output = movies.filter((movie) => movie.genres.includes(genre))
  } else {
    output = movies
  }
  if (order === "desc") return orderByYear(output).reverse()
  return orderByYear(output)
}

export default function Exercise02() {
  const { movies, loading, fetchCount } = useMovies()
  const { genres, loading: loadingGenres, handleChange, genre } = useGenres()
  const [order, setOrder] = useState('desc')

  const handleOrder = () => {
    if (order === 'desc') setOrder('asc')
    else setOrder('desc')
  }

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library {!loadingGenres && (', filted by' + (genre ? ` (${genre})` : " (All)"))}
      </h1>
      <div className="movie-library__actions">
        {(
          <select
            disabled={loadingGenres || genres.length === 0}
            name="genre"
            placeholder="Search by genre..."
            value={genre}
            onChange={handleChange}
          >
            <option value="">
              All genres
            </option>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>)}
        <button onClick={handleOrder} disabled={loading}>
          Order by {order === 'desc' ? 'Descending' : 'Ascending'}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {filterMovies(movies, { genre, order }).map(movie => (
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
          ))}
        </ul>
      )}
    </section>
  )
}