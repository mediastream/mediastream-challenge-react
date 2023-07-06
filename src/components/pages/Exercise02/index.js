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

import { useEffect, useState } from "react";
import "./assets/styles.css";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [genres, setGenres] = useState([]);
  const handleMovieFetch = () => {
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    setLoading(true);
    fetch("http://localhost:3001/movies?_limit=50")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  const filterMoviesByGenre = () => {
    if (!selectedGenre) {
      return movies;
    }
    return movies.filter((movie) => movie.genres.includes(selectedGenre));
  };

  const sortMoviesByYear = (moviesToSort) => {
    return moviesToSort.sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.year - b.year;
      } else {
        return b.year - a.year;
      }
    });
  };

  const handleGenresFetch = () => {
    console.log("Getting genres");
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  useEffect(() => {
    handleMovieFetch();
    handleGenresFetch();
  }, []);

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {genres.map((genre, i) => (
            <option value={genre} key={genre + i}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={handleSortOrderChange} className="sortBtn">
          {sortOrder === "ascending" ? "Order Descending" : "Order Ascending"}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {sortMoviesByYear(filterMoviesByGenre()).map((movie) => (
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
