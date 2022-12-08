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

import headerImage from './assets/mountains.jpeg'


// In a bigger project it should be in a utils folder that allow be used
// by many components without code repeat
const movieComparator = (movieA, movieB) => movieA.year - movieB.year;


export default function Exercise02 () {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [ascending, setAscending] = useState(true);

  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log('Getting movies');
    fetch('http://localhost:3001/movies?')
      .then(res => res.json())
      .then(json => {
        // sort movies in ascending order
        json.sort(movieComparator);
        setMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api');
      });
  }

  const handleGenresFetch = () => {
    setLoading(true);
    fetch('http://localhost:3001/genres?')
      .then(res => res.json())
      .then(json => {
        setGenres(json);
        setLoading(false);
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api');
      });
  }

  useEffect(() => {
    handleMovieFetch();
    handleGenresFetch();
  }, []);

  // After load movies, create a copy to filteredMovies
  useEffect(() => {
    setFilteredMovies([...movies]);
    // Set default

  }, [movies])


  const handleGenreChange = (event) => {
    if (event.target.value === "") {
        const allMovies = [...movies];
        if (!ascending) {
            allMovies.reverse();
        }
        setFilteredMovies(allMovies);
    } else {
        const moviesByGenre = movies.filter(movie => movie.genres.includes(event.target.value));
        if (!ascending) {
            moviesByGenre.reverse();
        }
        setFilteredMovies(moviesByGenre);
    }
    setGenre(event.target.value);
  }

  const handleAscending = () => {
    const invertedMoves = [...filteredMovies];
    invertedMoves.reverse();
    setFilteredMovies(invertedMoves);
    setAscending(!ascending);
  }

  return (
    <section className="movie-library">
        <div className="header">
          <img src={headerImage} alt=""/>
          <div className="movie-library__title">
            <h1 >Movie Library</h1>
          </div>

          <div className="movie-library__actions">
            <select name="genre" placeholder="Search by genre..." value={genre} onChange={handleGenreChange}>
              <option value={""}>Search by genre</option>
              {
                  genres.map((genre, i) => (
                      <option key={i} value={genre}>{genre}</option>
                  ))
              }
            </select>
            <button onClick={handleAscending}>{ascending ?'Order Descending' : 'Order Ascending'}</button>
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
            <div key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li key="title" className="movie-title">{movie.title}</li>
                <li key="genres">{movie.genres.join(', ')}</li>
                <li key="year">{movie.year}</li>
              </ul>
            </div>
          ))}
        </ul>
      )}
    </section>
  )
}