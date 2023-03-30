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
  const [selectedGenre, setSelectedGenre] = useState("");
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
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

  const handleGenreFetch = () => {
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const handleGenreChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGenre(selectedValue);
    if (selectedValue === null) {
      handleMovieFetch();
    } else {
      fetch(
        `http://localhost:3001/movies?_limit=50&genres_like=${selectedValue}`
      )
        .then((res) => res.json())
        .then((json) => {
          setMovies(json);
        })
        .catch(() => {
          console.log("Run yarn movie-api for fake api");
        });
    }
  };

  const handleOrderChange = () => {
    setAscendingOrder(!ascendingOrder);
  };

  useEffect(() => {
    handleMovieFetch();
    handleGenreFetch();
  }, []);

  useEffect(() => {
    let sortedMovies = [...movies];
    if (ascendingOrder) {
      sortedMovies.sort((a, b) => a.year - b.year);
    } else {
      sortedMovies.sort((a, b) => b.year - a.year);
    }
    setMovies(sortedMovies);
  }, [ascendingOrder]);

  return (
    <section className="movie-library">
      <div className="movie-library__title-font">
        <div className="movie-library_container">
          <h1 className="movie-library__title">Movie Library</h1>

          <div className="movie-library__actions">
            <select
              name="genre"
              placeholder="Search by genre..."
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              <option value={null}>All Genres</option>

              {genres.map((genre) => (
                <option key={genre.id} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <button onClick={handleOrderChange}>
              {ascendingOrder ? "Year Descending" : "Year Ascending"}
            </button>
          </div>
        </div>
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
                <li className="movie-library__list_title"> {movie.title}</li>
                <li> {movie.genres.join(", ")}</li>
                <li> {movie.year}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
