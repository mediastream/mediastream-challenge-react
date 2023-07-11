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
  const [genres, setGenres] = useState([]);
  const [descendingOrder, setDescendingOrder] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState();
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    fetch("http://localhost:3001/movies?_limit=50")
      .then((res) => res.json())
      .then((json) => {
        organizeArray(json);
        setLoading(false);
      })
      .catch(() => {
        throw new Error("Run yarn movie-api for fake api");
      });
  };

  const handleGenresFetch = () => {
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        const finalGenresArray = ["All", ...json];
        setGenres(finalGenresArray);
      })
      .catch(() => {
        throw new Error("Run yarn movie-api for fake api");
      });
  };

  const organizeArray = (moviesArray) => {
    const organizedArray =
      descendingOrder === true
        ? moviesArray.sort((a, b) => b.year - a.year)
        : moviesArray.sort((a, b) => a.year - b.year);

    setDescendingOrder(!descendingOrder);
    setMovies(organizedArray);
  };

  const filterMovies = () => {
    if (selectedGenre && selectedGenre !== "All") {
      const filteredMovies = movies.filter((movie) =>
        movie.genres.includes(selectedGenre)
      );
      organizeArray(filteredMovies);
    } else {
      handleMovieFetch();
    }
  };

  useEffect(() => {
    handleGenresFetch();
    handleMovieFetch();
  }, []);

  return (
    <section className="movie-library">
      <div className="background-container">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions form-group">
          <select
            className="custom-select"
            name="genre"
            placeholder="Search by genre..."
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
          </select>
          <button className="custom-select-button" onClick={filterMovies}>
            {descendingOrder ? "Order Descending" : "Order Ascending"}
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
                <img
                  className="movie-img"
                  src={movie.posterUrl}
                  alt={movie.title}
                />
                <div className="movie-library__card-gradient">
                  <ul className="movie-description-wrapper">
                    <li>ID: {movie.id}</li>
                    <li>Title: {movie.title}</li>
                    <li>Year: {movie.year}</li>
                    <li>Runtime: {movie.runtime}</li>
                    <li>Genres: {movie.genres.join(", ")}</li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
