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

import { useState, useMemo } from "react";
import { useGetMovies } from "./hooks/useGetMovies";
import { useGetGenres } from "./hooks/useGetGenres";
import { constants } from "./utils/constants";

import fallback from "./assets/Fallback_Film.png"

import "./assets/styles.css";

export default function Exercise02() {
  const { loading, movies, fetchCount } = useGetMovies();
  const { genres } = useGetGenres();

  const [selectedGenre, setSelectedGenre] = useState("Comedy");
  const [order, setOrder] = useState(false);

  const {
    TITLE,
    SELECT_PLACEHOLDER,
    LOADING,
    FETCH_TIMES,
    ASCENDING,
    DESCENDING,
    ORDER,
  } = constants;

  const filterMovies = useMemo(
    () => movies.filter(movie => movie.genres.find(genre => genre === selectedGenre)),
    [movies, selectedGenre],
  );

  const orderMovies = useMemo(() =>
    filterMovies.sort((prevMovie, nextMovie) =>
      order ? parseInt(nextMovie.year) - parseInt(prevMovie.year)
        : parseInt(prevMovie.year) - parseInt(nextMovie.year))
    , [order, filterMovies]);

  const handleSelectOption = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleSortMovies = () => {
    setOrder(!order);
  };

  const handleImageError = (e) => {
    e.target.src = fallback;
  }

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        {TITLE}
      </h1>
      <section className="movie-library__actions">
        <select name="genre" placeholder={SELECT_PLACEHOLDER} onChange={(e) => handleSelectOption(e)} defaultValue={selectedGenre}>
          {
            genres.map((genre, index) => (
              <option key={`genre-${index}`} value={genre}>{genre}</option>
            ))
          }
        </select>
        <button onClick={handleSortMovies}>{ORDER} {order ? DESCENDING : ASCENDING}</button>
      </section>
      {loading ? (
        <section className="movie-library__loading">
          <p>{LOADING}</p>
          <p>{FETCH_TIMES(fetchCount)}</p>
        </section>
      ) : (
        <section className="movie-library__list">
          {orderMovies.map(movie => (
            <article key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} onError={handleImageError} />
              <div className="movie-library__card__description">
                <p className="movie-library__card__title shadow-text">{movie.title}</p>
                <p className="shadow-text">{movie.genres.join(', ')}</p>
                <p className="shadow-text">{movie.year}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </section>
  )
}