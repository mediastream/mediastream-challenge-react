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
import defaultImg from './assets/default.jpg';

export default function Exercise02 () {

  const sortTypes = {
    'DES': 'desending',
    'ASC': 'ascending'
  }

  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [genres, setGenres] = useState([])
  const [sortType, setSortType] = useState(null)
  const [showMovies, setShowMovies] = useState([])

  const handleMovieFetch = async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    await getMovies(50)
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setShowMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  const getMovies = async ( limit ) => {
    return await fetch(`http://localhost:3001/movies?_limit=${limit}`);
  }

  const getGenres = async () => {
    const response = await fetch('http://localhost:3001/genres')
    .then( res => res.json());
    setGenres(response)
  }

  useEffect(async () => {
    await handleMovieFetch();
    await getGenres();
  }, [])

  const switchSortType = () => {
    let sortMovies = [];
    if (!sortType) {
      setSortType(sortTypes.DES);
      sortMovies = showMovies.sort( (itemA, itemB) => itemA.year - itemB.year);
      return;
    } 
    sortType === sortTypes.ASC ? setSortType(sortTypes.DES) : setSortType(sortTypes.ASC);
    if ( sortType === sortTypes.ASC ) {
      sortMovies = showMovies.sort( (itemA, itemB) => itemA.year - itemB.year);
    } else {
      sortMovies = showMovies.sort( (itemA, itemB) => itemB.year - itemA.year);
    }
    setShowMovies(sortMovies)
  }

  const getMoviesByGenre = async ( genre ) => {
    if ( genre === 'all' ) {
      setShowMovies(movies);
      return;
    }
    let allMovies = []
    setLoading(true)
    await getMovies('')
      .then(res => res.json())
      .then(json => {
        allMovies = json;
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
    const filteredMovies = [];
    allMovies.forEach( movie => {
      if ( movie.genres.find( movieGenres => movieGenres.toLowerCase() === genre.toLowerCase()) ) {
        filteredMovies.push(movie)
      }
    })
    let sortMovies = [];
    if ( sortType === sortTypes.DES ) {
      sortMovies = filteredMovies.sort( (itemA, itemB) => itemA.year - itemB.year);
    } else {
      sortMovies = filteredMovies.sort( (itemA, itemB) => itemB.year - itemA.year);
    }
    setShowMovies(sortMovies)
  }

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre..." onChange={ e => getMoviesByGenre(e.target.value) }>
          <option value='all'>All genres</option>
          {
            genres.map( genre => (
              <option value={genre} key={genre}>{genre}</option>
            ))
          }
        </select>
        <button onClick={ () => switchSortType() }>Sort {sortType}</button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {showMovies.map(movie => (
            <li key={movie.id} className="movie-library__card">
              <img src={ movie.posterUrl } alt={movie.title} />
              <ul>
                <li><strong>{movie.title}</strong></li>
                <li>{movie.genres.join(', ')}</li>
                <li>{movie.year}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}