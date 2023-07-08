/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch) [done]
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading [done]
 * list of movies that belong to that gender (Filter all movies). [done]
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list [done]
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png) [done]
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  useEffect(() => {
    handleMovieFetch()
  }, [])
  return { data, loading, fetchCount }
}

export default function Exercise02() {

  const { data: movies, loading, fetchCount } = useFetch('http://localhost:3001/movies?_limit=50')
  const { data: genres, loading: loadingGenres, fetchCount: genresFetchCount } = useFetch('http://localhost:3001/genres')
  const [genre, setGenre] = useState("")

  const [ascending, setAscending] = useState(false)
  const sortMovies = (movies) => {
    movies.sort((a, b) => {
      if (a.year > b.year) {
        return 1
      }
      if (a.year < b.year) {
        return -1
      }
      return 0
    })
    return ascending ? movies : movies.reverse()
  }
  return (
    <section className="movie-library" id="movie-library-id-jhjkloe">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre..." value={genre} onChange={(e) => setGenre(e.target.value)}>
          {genres && <option value="" disabled>Select one of the genre</option>}
          {loadingGenres && (<option disabled>Loading... and fetched {genresFetchCount}</option>)}
          {genres && genres.map(genre => (<option value={genre} >{genre}</option>))}
        </select>
        <button onClick={() => setAscending(!ascending)}>Order Descending</button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {sortMovies(movies).map(movie => {
            if (genre && !movie.genres.includes(genre)) {
              return null
            }
            return (<li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <div className="content">
                  <li className="title">{movie.title}</li>
                  <li className="sub-title">{movie.genres.join(', ')}</li>
                  <li className="sub-title">{movie.year}</li>
                </div>
              </ul>
            </li>)
          })}
        </ul>
      )}
    </section>
  )
}