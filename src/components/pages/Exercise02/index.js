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
import { useEffect, useState, useCallback } from "react";
import Card from "./components/MovieCard";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingGenre, setLodingGenre] = useState();
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [orderType, setOrderType] = useState("asc");

  const handleMovieFetch = useCallback(async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    await fetch("http://localhost:3001/movies?_limit=50")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setFilteredMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  }, []);

  const handleGenreFetch = useCallback(async () => {
    setLodingGenre(true);
    await fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
        setLodingGenre(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  }, []);

  useEffect(() => {
    handleMovieFetch();
    handleGenreFetch();
  }, [handleMovieFetch, handleGenreFetch]);

  const filterMovies = (genre) => {
    if (genre !== "*") {
      const auxFilteredMovies = movies.filter((movie) => {
        if (movie.genres.some((g) => g === genre)) return movie;
      });
      setFilteredMovies(auxFilteredMovies);
    } else {
      setFilteredMovies(movies);
    }
  };

  const sortByMovieYear = () => {
    return filteredMovies.sort((a, b) => {
      if (orderType === "asc") return parseInt(a.year) - parseInt(b.year);
      else return parseInt(b.year) - parseInt(a.year);
    });
  };

  return (
    <section className="movie-library">
      <div className="movie-library__header">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            onChange={(e) => {
              filterMovies(e.target.value);
            }}
            name="genre"
            placeholder="Search by genre..."
          >
            <option key={"*"} value={"*"}>
              {loadingGenre ? "Loading..." : "Show all"}
            </option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={() => setOrderType(orderType === "asc" ? "desc" : "asc")}>
            Year {orderType === "asc" ? "Descending" : "Ascending"}
          </button>
        </div>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <div class="movie-library__wrapper">
          {sortByMovieYear().map((movie) => (
            <Card movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
