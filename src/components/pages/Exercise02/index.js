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

const placeholder = require("./assets/placeholder.jpg");

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("ALL");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const handleGenreFetch = () => {
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
    handleGenreFetch();
  }, []);

  useEffect(() => {
    const handleMovieFetch = () => {
      setLoading(true);
      setFetchCount(fetchCount + 1);
      let url = `http://localhost:3001/movies?_sort=year&_order=${order}&sp`;
      if (selectedGenre !== "ALL") {
        url = `${url}&genres_like=${selectedGenre}`;
      }
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          setMovies(json);
          setLoading(false);
        })
        .catch(() => {
          console.log("Run yarn movie-api for fake api");
        });
    };
    handleMovieFetch();
  }, [selectedGenre, order]);

  const switchOrder = () => {
    if (order === "asc") {
      setOrder("desc");
    }
    if (order === "desc") {
      setOrder("asc");
    }
  };

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="ALL">All genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={switchOrder}>
          Year {order === "asc" ? "Ascending" : "Descending"}
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
                src={movie.posterUrl}
                alt={movie.title}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = placeholder.default;
                }}
              />
              <ul>
                <li>{movie.title}</li>
                <li>{movie.year}</li>
                <li>{movie.genres.join(", ")}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
