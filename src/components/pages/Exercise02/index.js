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
  const [genres, setGenres] = useState([])
  const [genreSelected, setGenreSelected] = useState('default')
  const [empty, setEmpty] = useState(false)
  const [order, setOrder] = useState('Default')
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch('http://localhost:3001/movies')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        storeMoviesOriginal(json)
        setLoading(false)
      })
      .catch(() => {
        console.error('An error has occurred trying to fetching [movies] endpoint.')
      })
  }

  const handleGenresFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setGenres(json)
        setLoading(false)
      })
      .catch(() => {
        console.error('An error has occurred trying to fetching [genres] endpoint.')
      })
  }

  const setMoviesAscendingOrder = () => {
    try{
      movies.sort((movieA, movieB) => parseInt(movieA['year']) - parseInt(movieB['year']))
    }catch (err){
      throw err;
    }
  }

  const setMoviesDescendingOrder = () => {
    try{
      movies.sort((movieA, movieB) => parseInt(movieB['year']) - parseInt(movieA['year']))
    }catch (err){
      throw err;
    }
  }

  const setMoviesDefaultOrder = () => {
    const moviesOriginal = retrieveMoviesOriginal()
    if(genreSelected !== 'default'){
      const moviesFiltered = filterMoviesByGenre()
      setMovies(moviesFiltered)
    }else{
      setMovies(moviesOriginal)
    }
  }

  const storeMoviesOriginal = (data) => {
    sessionStorage.setItem('moviesOriginal', JSON.stringify(data))
  }

  const retrieveMoviesOriginal = () => {
    return JSON.parse(sessionStorage.getItem('moviesOriginal'))
  }

  const handleSorting = () => {
    if(order === 'Ascending'){
      setMoviesDescendingOrder()
      setOrder('Descending')
    }
    if(order === 'Descending'){
      setMoviesDefaultOrder()
      setOrder('Default')
    }
    if(order === 'Default'){
      setMoviesAscendingOrder()
      setOrder('Ascending')
    }
  }

  const filterMoviesByGenre = () => {
    const moviesOriginal = retrieveMoviesOriginal()
    if(genreSelected !== 'default'){
      const moviesFiltered = []
      moviesOriginal?.forEach(movie => {
        movie.genres.find(movie_genre => {
          if(genreSelected == movie_genre){
            moviesFiltered.push(movie);
          }
        })
      })
      return moviesFiltered
    }
    return moviesOriginal
  }

  const handleSelect = (event) => {
    if(typeof event.target.value === 'string'){
      const genreSelected = event.target.value
      setGenreSelected(genreSelected)
      setOrder('Default')
    }
  }

  useEffect(() => {
    handleMovieFetch()
    handleGenresFetch()
  }, [])

  useEffect(() => {
    const moviesFiltered = filterMoviesByGenre()
    if(moviesFiltered.length > 0){
      setEmpty(false)
      setMovies(moviesFiltered)
    }else{
      setMovies([])
      setEmpty(true)
    }
  }, [genreSelected])

  return (
    <section className="movie-library">
      <div className="movie-library__header">
        <h1 className="movie-library__title">
          Movie Library
        </h1>
        <div className="movie-library__actions">
          <select onChange={handleSelect}
            name="genre" placeholder="Search by genre...">
            <option key="default" value="default" default>Select a genre</option>
            {genres?.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
          <button onClick={handleSorting}>Year {order}</button>
        </div>
      </div>
      {empty ? (
        <div className="movie-library__empty">
        <p>{genreSelected.toString().toUpperCase()} filter not found results</p>
      </div>
      ) : ''}
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies?.map(movie => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li>{movie.title}</li>
                <li>{movie.year}</li>
                <li>{movie.genres.join(', ')}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}