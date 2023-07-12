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

export default function Exercise02() {
  const [movies, setMovies] = useState([])
  const [moviesCopy, setMoviesCopy] = useState([])
  const [genres, setGenres] = useState([])
  const [order, setOrder] = useState(true)

  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch(`http://localhost:3001/movies/?_limit=51`)
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setMoviesCopy(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  /* fetching the genres */
  const handleGenreFetch = () => {

    fetch(`http://localhost:3001/genres/`)
      .then(res => res.json())
      .then(json => {
        setGenres(json)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  /* genrer filter */
  const changeGenrer = async (event) => {

    let filtredMovies = moviesCopy.filter(item => item.genres.includes(event.target.value))

    setMovies(filtredMovies)

  }

  /* changing between ascending and descending */
  const changeOrder = (order) => {

    let sortedMovies = []

    if (order) {
      sortedMovies = movies.slice().sort((a, b) => b.year - a.year)
    } else {
      sortedMovies = movies.slice().sort((b, a) => b.year - a.year)
    }


    setMovies(sortedMovies)

  }

  useEffect(() => {
    handleMovieFetch()
    handleGenreFetch()
  }, [])

  return (
    <section className="movie-library">
      <header className="movie-header">
        <h1 className="movie-library__title">
          Movie Library
        </h1>
        <div className="movie-library__actions">
          <select name="genre" placeholder="Search by genre..." onChange={changeGenrer}>
            {
              genres.map(item => (<option key={item} value={item} >{item}</option>))
            }

          </select>
          <button onClick={() => { setOrder(!order); changeOrder(order) }}>{order ? "Year Descending" : "Year Ascending"}</button>
        </div>
      </header>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map(movie => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <div className="movie-library__info">
                <ul>
                  <li className="movie-library__name">{movie.title}</li>
                  <li className="movie-library__details">{movie.genres.join(', ')}</li>
                  <li className="movie-library__details">{movie.year}</li>
                </ul>
              </div>

            </li>
          ))}
        </ul>
      )}
    </section>
  )
}