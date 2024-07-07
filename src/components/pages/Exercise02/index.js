/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 OK * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 Ok * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading list of movies that belong to that gender (Filter all movies).
 OK * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 OK * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import { useEffect, useState } from "react";

import "./assets/styles.css";

export default function Exercise02() {
  const INITIAL_VALUES = {
    selectOption: "Select your favorite genre",
    orderDescending: "Order Descending",
    orderAscending: "Order Ascending",
  };
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreSelected, setGenreSelected] = useState("");
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(INITIAL_VALUES.orderAscending);

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    fetch("http://localhost:3001/movies")
      .then((res) => res.json())
      .then((movies) => {
        const filteredMovies = movieFilter(movies);
        setMovies(filteredMovies);
        setOrder(INITIAL_VALUES.orderAscending);
        setLoading(false);
      })
      .catch(() => {
        console.log("Fail on Fetch Movies");
      });
  };

  const handleGenresFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        const genres = [INITIAL_VALUES.selectOption, ...json];
        setGenres(genres);
        setLoading(false);
      })
      .catch(() => {
        console.log("Fail on Fetch Genres");
      });
  };

  const movieFilter = (movies) => {
    const filter = movies.map((movie) => {
      const { genres } = movie;
      const moviesFiltered = genreSelected === "" ? movie : genres.includes(genreSelected) ? movie : null;
      return moviesFiltered;
    });

    const cleanedArray = filter.filter((movie) => movie);
    return cleanedArray.sort((a, b) => a.year - b.year).reverse();
  };

  const orderMovies = () => {
    order === INITIAL_VALUES.orderAscending ? ascending() : descending();
    movies.reverse();
  };

  const ascending = () => {
    setOrder(INITIAL_VALUES.orderDescending);
  };

  const descending = () => {
    setOrder(INITIAL_VALUES.orderAscending);
  };

  useEffect(() => {
    handleMovieFetch();
  }, [genreSelected]);

  useEffect(() => {
    handleGenresFetch();
  }, []);

  const handleSelectGenre = ({ currentTarget }) => {
    setGenreSelected(currentTarget.value);
  };

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre..." onChange={handleSelectGenre}>
          {genres.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={orderMovies}>{order}</button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map(({ id, posterUrl, title, year, runtime, genres }) => (
            <li key={id} className="movie-library__card">
              <img src={posterUrl} alt={title} />
              <ul>
                <li>{year}</li>
                <li>{genres.join(", ")}</li>
                <li>{title}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
