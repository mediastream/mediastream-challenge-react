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
  const [currentGenre, setCurrentGenre] = useState();
  const [isDecending, setIsDecending] = useState(false);

  const handleMovieFetch = async () => {
    try {
      setLoading(true);
      setFetchCount(fetchCount + 1);
      const urlString = isDecending ? "desc" : "asc";
      const response = await fetch(
        `http://localhost:3001/movies?genres_like=${currentGenre}&_sort=year&_order=${urlString}`
      );
      if (response.status === 200) {
        const answer = await response.json();
        setMovies(answer);
      }
      setLoading(false);
    } catch (error) {
      console.log("Run yarn movie-api for fake api");
    }
  };

  const handleGenreFetch = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/genres");
      if (response.status === 200) {
        const answer = await response.json();
        setGenres(answer);
        setCurrentGenre(answer[0]);
      }
      setLoading(false);
    } catch (error) {
      console.log("Run yarn movie-api for fake api");
    }
  };

  useEffect(() => {
    handleGenreFetch();
  }, []);

  useEffect(() => {
    if (currentGenre !== undefined) {
      handleMovieFetch();
    }
  }, [currentGenre, isDecending]);

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          onChange={(e) => {
            setCurrentGenre(e.target.value);
          }}
        >
          {genres.map((genre) => (
            <option value={genre}>{genre}</option>
          ))}
        </select>
        <button onClick={() => setIsDecending(!isDecending)}>
          {isDecending ? "Year Ascending" : "Year Descending"}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map((movie) => {
            const backStyle = {
              "--img": `url(${movie.posterUrl})`,
            };
            return (
              <li
                key={movie.id}
                className="movie-library__card"
                style={backStyle}
              >
                <div className="movie-bottom">
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-text"> {movie.genres.join(", ")}</div>
                  <div className="movie-text"> {movie.year}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
