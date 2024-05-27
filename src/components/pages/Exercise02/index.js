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
import mountainImg from './assets/mountains.jpeg'

export default function Exercise02 () {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState('asc');

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    fetch(`http://localhost:3001/movies?_limit=50`)
      .then(res => res.json())
      .then(json => {
        const filteredMovies = selectedGenre 
          ? json.filter(movie => movie.genres.includes(selectedGenre))
          : json;
        const sortedMovies = filteredMovies.sort((a, b) => a.year - b.year);
        setMovies(sortedMovies);
        setOrder('asc');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleGenreFetch = () => {
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => setGenres(json));
  };

  useEffect(() => {
    handleGenreFetch();
    handleMovieFetch();
  }, [selectedGenre]);

  const handleOrderToggle = () => {
    const sortedMovies = [...movies].sort((a, b) => order === 'asc' ? b.year - a.year : a.year - b.year);
    setMovies(sortedMovies);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <section className="movie-library">
      <div id="backgroundImgContainer">
      </div>
      <div className="search">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select name="genre" onChange={(e) => setSelectedGenre(e.target.value)} placeholder="Search by genre...">
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <span className="year-btn" onClick={handleOrderToggle}>Year {order === 'asc' ? 'Descending' : 'Ascending'}</span>
        </div>
      </div>
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
              <ul className="movie-description">
                <li id="movieTitle">{movie.title}</li>
                <li>{movie.genres.join(', ')}</li>
                <li>{movie.year}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
