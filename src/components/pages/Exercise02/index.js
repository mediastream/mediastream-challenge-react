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

import "./assets/styles.css";
import { useEffect, useState } from "react";

export default function Exercise02 () {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setfilteredMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [ascendingOrder, setAscendingOrder] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState('')

  const handleMovieFetch = async () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies', fetchCount)
    try {
      const response = await fetch('http://localhost:3001/movies?_limit=50')
      const json = await response.json()
      setMovies(json)
      setLoading(false)
    } catch (error) {
      console.log('Run yarn movie-api for fake api')
    }
  }

  const handleGenreFetch = async () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting genres', fetchCount)
    try {
      const response = await fetch('http://localhost:3001/genres')
      const json = await response.json()
      json.sort()
      setGenres(json)
      setLoading(false)
    } catch (error) {
      console.log('Run yarn movie-api for fake api')
    }
  }

  const handleGenreChange = (e) => {
    const value = e.target.value
    if(value === 'all-genres') {
      setSelectedGenre('')
      setfilteredMovies(movies)
      return
    }
    setSelectedGenre(value)
  }

  const handleOrderToggle = () => {
    setAscendingOrder(!ascendingOrder)
  }

  useEffect(() => {
    handleMovieFetch()
    handleGenreFetch()
  }, [])

  useEffect(() => {
    const filteredMovies = selectedGenre
        ? movies.filter(movie => movie.genres.includes(selectedGenre))
        : movies

    const sortedMovies = ascendingOrder
        ? filteredMovies.sort((a, b) => a.year - b.year)
        : filteredMovies.sort((a, b) => b.year - a.year)

    setfilteredMovies(sortedMovies)
  }, [ascendingOrder, selectedGenre, movies])

  return (
    <section className="movie-library">
      <div className="movie-library__header">
        <div className="movie-library__container">
          <h1 className="movie-library__title">
            Movie Library
          </h1>
          <div className="movie-library__actions">
            <select
              name="genre"
              value={selectedGenre}
              onChange={handleGenreChange}
              placeholder="Search by genre..."
            >
              <option value="all-genres" key="all-genres">All genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <button onClick={handleOrderToggle}>
              Order {ascendingOrder ? 'Descending' : 'Ascending'}
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {filteredMovies.map(movie => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li>ID: {movie.id}</li>
                <li className='movie-library__title-movie'>Title: {movie.title}</li>
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
