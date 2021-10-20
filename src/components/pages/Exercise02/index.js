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
  const initialGenresValue = 'Search by genre...';

  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [genresSelected, setGenresSelected] = useState(initialGenresValue)
  const [isAscendingList, setIsAscendingList] = useState(true)
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
   handleGenresFetch()
    handleMovieFetch()
  }, [movies])

  const handleMovieFetch = () => {
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json);
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  const handleGenresFetch = () => {
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setGenres(json);
      })
      .catch(() => {
      })
  }

  const getGenresSelected = (e) => {
    setGenresSelected(e.target.value);
  }

  const sorterAndfilterMovies = () => {

    const sortedMovies = isAscendingList ?  movies.sort((a, b) => a.title.normalize().localeCompare(b.title.normalize())) 
    :  movies.sort((a, b) => b.title.normalize().localeCompare(a.title.normalize()));

    return (genresSelected !== initialGenresValue) ? 
    sortedMovies.filter(item => item.genres.some(genres => genres === genresSelected)) : sortedMovies;

  } 

  const btnOrderList = (e) => {
    setIsAscendingList(!isAscendingList);
  }
  

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select name="genre"  onChange={getGenresSelected} value={genresSelected}>
        <option value={initialGenresValue}>{initialGenresValue}</option>
          {genres.map( item => ( 
              <option value={item}>{item}</option>))}
          
        </select>
        <button onClick={e => btnOrderList(e)}>{`Order ${isAscendingList ? 'Ascending' :  'Descending'} `}</button>
      </div>
      {loading ? (
      <div className="movie-library__loading">
        <p>Loading...</p>
        <p>Fetched {fetchCount} times</p>
      </div>
    ) : (
      <ul className="movie-library__list">
        {sorterAndfilterMovies().map(movie => (
          <li key={movie.id} className="movie-library__card">
            <img src={movie.posterUrl} alt={movie.title} />
              <li>{movie.title}</li>
              <li>{movie.genres.join(', ')}</li>
              <li>{movie.year}</li>
          </li>
        ))}
      </ul>
    )}
    </section>
  )
}