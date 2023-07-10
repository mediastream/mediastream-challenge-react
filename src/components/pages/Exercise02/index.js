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
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movieYear, setMovieYear] = useState('Order Descending');

  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setFilteredMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  useEffect(() => {
    fetch('http://localhost:3001/genres')
    .then(res => res.json())
    .then(json => {
      setGenres(json);
    })
    .catch(() => {
      console.log('Run yarn movie-api for fake api');
    });
    handleMovieFetch()
  }, [])

  useEffect(() => {
    setFilteredMovies(selectedGenres
    ? movies.filter(movie => movie.genres.includes(selectedGenres))
    : movies)
  }, [selectedGenres])

  useEffect(() => {
    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (movieYear === 'Order Descending') {
        return a.year - b.year;
      } else {
        return b.year - a.year;
      }
    });
  
    if (!arraysEqual(filteredMovies, sortedMovies)) {
      setFilteredMovies(sortedMovies);
    }
  }, [movieYear, filteredMovies]);
  
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  const handleGenreChange = (e) => {
    setSelectedGenres(e.target.value);
  }

  const changeYearFilter = () => {
    movieYear === 'Order Descending' ? setMovieYear('Order Ascending') : setMovieYear('Order Descending');
  }


  return (
    <section className="movie-library">
      
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select onChange={handleGenreChange} name="genre" placeholder="Search by genre...">
          <option value="">All genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <button onClick={() => changeYearFilter()}>{movieYear}</button>
        
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
                <li>{movie.title}</li>
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