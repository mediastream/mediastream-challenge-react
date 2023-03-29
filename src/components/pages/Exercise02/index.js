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
import { useMemo, useState } from "react";
import useApi from "./hooks/useApi";
import { MovieItemList } from "./components/MovieItemList";

export default function Exercise02() {
  const { data: movies, isLoading: isLoadingMovies } = useApi("movies");
  const { data: genres } = useApi("genres");

  const [selectedGenre, setSelectedGenre] = useState("");
  const [order, setOrder] = useState("desc");

  const handleChangeGenre = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleOrder = () => {
    if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };

  const filterMovies = useMemo(
    () =>
      movies
        .filter((movie) => movie.genres.includes(selectedGenre))
        .sort((movieA, movieB) => {
          if (order === "asc") {
            return movieA.year - movieB.year;
          } else {
            return movieB.year - movieA.year;
          }
        }),
    [selectedGenre, order]
  );

  return (
    <section className="movie-library">
      <div className="movie-library__header_container">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={handleChangeGenre}
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
          </select>
          {
            <button onClick={handleOrder}>{`Order ${
              order === "asc" ? "Descending" : "Ascending"
            }`}</button>
          }
        </div>
      </div>
      {isLoadingMovies ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {filterMovies.map((movie) => (
            <MovieItemList movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
}
