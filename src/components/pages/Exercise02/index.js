/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch) --DONE
 *
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies). --DONE
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [OrderAscending, setOrderAscending] = useState(true);
  const [filterGenre, setFilterGenre] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    handleMovieFetch();
  }, [selectedGenre, OrderAscending]);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    const data = await fetch("http://localhost:3001/genres");
    const genres = await data.json();
    setGenres(["Select a genre", ...genres]);
  };

  const handleMovieFetch = () => {
    const url = filterGenre
      ? "http://localhost:3001/movies?"
      : "http://localhost:3001/movies?_limit=50";
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        filterGenre
          ? setMovies(
              json
                .filter((movie) => movie.genres.includes(selectedGenre))
                .sort(
                  OrderAscending
                    ? (firstMovie, secondMovie) =>
                        firstMovie.year - secondMovie.year
                    : (firstMovie, secondMovie) =>
                        secondMovie.year - firstMovie.year
                )
            )
          : setMovies(
              json.sort(
                OrderAscending
                  ? (firstMovie, secondMovie) =>
                      firstMovie.year - secondMovie.year
                  : (firstMovie, secondMovie) =>
                      secondMovie.year - firstMovie.year
              )
            );
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const changeOrder = () => {
    setOrderAscending(!OrderAscending);
  };

  const filterByGenre = () => {
    setFilterGenre(true);
  };
  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            filterByGenre();
          }}
        >
          {genres.map((genre, index) => {
            return (
              <option
                defaultValue="adas"
                value={genre}
                key={`${genre}-${index}`}
              >
                {genre}
              </option>
            );
          })}
        </select>
        <button onClick={changeOrder}>
          {OrderAscending ? "Year ascending" : "Year descending"}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map((movie) => (
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
