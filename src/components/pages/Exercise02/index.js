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
  const [allMovies, setAllMovies] = useState([]);
  const [genre, setGenres] = useState([]);
  const [order, setOrder] = useState(true); //ascending is true; descending is false
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleMovieFetch = async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    const response = await fetch("http://localhost:3001/movies?_limit=50");
    const data = await response.json();
    console.log(data);
    setAllMovies(data);
    setMovies(data);
    setLoading(false);
  };

  const handleFetchGenres = async () => {
    const response = await fetch("http://localhost:3001/genres");
    const data = await response.json();
    setGenres(data);
    console.log(data);
  };

  const handleGenreFilter = (genre) => {
    genre === "All"
      ? setMovies(allMovies)
      : setMovies(() =>
          allMovies.reduce((acc, movie) => {
            if (movie.genres.includes(genre)) {
              acc.push(movie);
              return acc;
            }
            return acc;
          }, [])
        );
  };

  const handleSort = () => {
    setOrder(!order);
    let orderedMovies = movies;
    if (order) {
      orderedMovies.sort((a, b) => {
        if (a.year > b.year) {
          return -1;
        }
        if (a.year < b.year) {
          return 1;
        }
        return 0;
      });
    } else {
      orderedMovies.sort((a, b) => {
        if (a.year > b.year) {
          return 1;
        }
        if (a.year < b.year) {
          return -1;
        }
        return 0;
      });
    }

    setMovies(orderedMovies);
  };

  useEffect(() => {
    handleFetchGenres();
    handleMovieFetch();
  }, []);

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library {movies.length}</h1>
      <div className="movie-library__actions">
        <select
          onChange={(e) => handleGenreFilter(e.target.value)}
          name="genre"
          placeholder="Search by genre..."
        >
          <option value="All">All</option>
          {genre.length > 0
            ? genre.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))
            : null}
        </select>
        <button onClick={() => handleSort()}>
          {order ? "Order Descending" : "Order Ascending"}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li>{movie.title}</li>
                <li>{movie.genres.join(", ")}</li>
                <li>{movie.year}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
