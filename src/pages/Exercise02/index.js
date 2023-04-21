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
import { useState, useEffect } from "react";
import MoviesList from "./components/Movies/MoviesList";
import GenresList from "./components/Genres/GenresList";
import { useMovies } from "./hooks/useMovies";
import { useGenres } from "./hooks/useGenres";

export default function Exercise02() {
  const [currentGenre, setCurrentGenre] = useState("Todos");
  const [orderMovies, setOrderMovies] = useState("Ascending");
  const { movies, loadingMovies, errorMovies, fetchMoviesCount, getMovies } =
    useMovies();
  const { genres, loadingGenres, errorGenres, fetchGenresCount, getGenres } =
    useGenres();

  const handleChangeMoviesOrder = () => {
    setOrderMovies((orderMovies) =>
      orderMovies === "Ascending" ? "Descending" : "Ascending"
    );
  };

  useEffect(() => {
    getMovies();
    getGenres();
  }, []);

  return (
    <section className="exercise02">
      <h1 className="movie-library__title">Movie Library</h1>
      {loadingGenres && (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched Movies {fetchGenresCount} times</p>
        </div>
      )}
      {errorGenres && (
        <div className="movie-library__loading">
          <p>Error: </p>
          <p>{errorGenres}</p>
        </div>
      )}
      {!loadingGenres && !errorGenres && (
        <GenresList
          setCurrentGenre={setCurrentGenre}
          handleChangeMoviesOrder={handleChangeMoviesOrder}
          orderMovies={orderMovies}
          genres={genres}
        />
      )}
      {loadingMovies && (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched Movies {fetchMoviesCount} times</p>
        </div>
      )}
      {errorMovies && (
        <div className="movie-library__loading">
          <p>Error: </p>
          <p>{errorMovies}</p>
        </div>
      )}
      {!loadingMovies && !errorMovies && (
        <MoviesList
          error={errorMovies}
          movies={movies}
          currentGenre={currentGenre}
          orderMovies={orderMovies}
        />
      )}
    </section>
  );
}
