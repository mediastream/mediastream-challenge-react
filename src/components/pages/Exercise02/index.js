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
import { useEffect, useMemo, useState } from "react";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("0");
  const [genres, setGenres] = useState(["All movies"]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(true);

  const handleMovieFetch = () => {
    setLoading(true);
    fetch("http://localhost:3001/movies")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const handleGenresFetch = () => {
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(["All movies", ...json]);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const sorting = (a, b) => (order ? a.year - b.year : b.year - a.year);

  const moviesFiltered = useMemo(
    () =>
      genre === "0"
        ? movies
        : movies.filter((value) => value.genres.includes(genres[genre])),
    [movies, genre, genres]
  ).sort(sorting);

  useEffect(() => {
    handleGenresFetch();
    handleMovieFetch();
  }, []);

  return (
    <section className="movie-library">
      <div className="movie-library__header">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            name="genre"
            placeholder="Search by genre..."
            onChange={({ target }) => setGenre(target.value)}
          >
            {genres.map((m, i) => (
              <option value={i} key={m}>
                {m}
              </option>
            ))}
          </select>
          <button
            className="movie-library__order"
            onClick={() => setOrder(!order)}
          >
            {order ? "Year Ascending" : "Year Descending"}
          </button>
        </div>
      </div>
      <div className="movie-library__content">
        {loading ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
          </div>
        ) : (
          <ul className="movie-library__list">
            {moviesFiltered.map((movie) => (
              <li key={movie.id} className="movie-library__card">
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="movie-library__gradient" />
                <ul className="movie-library__description">
                  <li className="movie-library__title-card">{movie.title}</li>
                  <li>{movie.genres.join(", ")}</li>
                  <li>{movie.year}</li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
