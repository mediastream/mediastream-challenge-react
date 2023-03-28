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
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  // Fetches movies from the server and updates the state
  const handleMovieFetch = async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    try {
      const res = await fetch("http://localhost:3001/movies?_limit=50");
      const json = await res.json();
      setMovies(json);
      setLoading(false);
    } catch (error) {
      console.log("Run yarn movie-api for fake api");
    }
  };

  // Fetches genres from the server and updates the state
  const handleGenreFetch = async () => {
    try {
      const res = await fetch("http://localhost:3001/genres");
      const json = await res.json();
      setGenres(json);
    } catch (error) {
      console.log("Run yarn movie-api for fake api");
    }
  };

  useEffect(() => {
    handleMovieFetch();
    handleGenreFetch();
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filterMoviesByGenre = () => {
    if (selectedGenre) {
      return movies.filter((movie) => movie.genres.includes(selectedGenre));
    }
    return movies;
  };

  const handleOrderChange = () => {
    setAscendingOrder(!ascendingOrder);
  };

  const orderMoviesByYear = (movieList) => {
    return movieList.sort((a, b) =>
      ascendingOrder ? a.year - b.year : b.year - a.year
    );
  };

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          onChange={handleGenreChange}
          value={selectedGenre}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={handleOrderChange}>
          {ascendingOrder ? "Order Descending" : "Order Ascending"}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {orderMoviesByYear(filterMoviesByGenre()).map((movie) => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li>ID: {movie.id}</li>
                <li>Title: {movie.title}</li>
                <li>Year: {movie.year}</li>
                <li>Runtime: {movie.runtime}</li>
                <li>Genres: {movie.genres.join(", ")}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}