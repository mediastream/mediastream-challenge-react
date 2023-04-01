/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genders) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useState } from "react";
import { useGenders } from "./hooks/useGenders";
import { useFetchMovies } from "./hooks/useMovies";
import NotFoundImage from "./assets/notFound.png";

const filtersInitialState = { orderBy: "ASC", gerder: "" };

const orderButtonText = {
  ASC: "Year descending",
  DESC: "Year ascending",
};

export default function Exercise02() {
  const [filters, setFilters] = useState(filtersInitialState);
  const { genders, isLoading: isLoadingGenders } = useGenders();
  const { movies, isLoading: isLoadingMovies } = useFetchMovies(filters);

  const handleFilterGenderOnChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterOrderOnChange = () =>
    setFilters((currentFilters) => ({
      ...currentFilters,
      orderBy: currentFilters.orderBy === "ASC" ? "DESC" : "ASC",
    }));

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="gender"
          placeholder={isLoadingGenders ? "Loading..." : "Search by gender..."}
          disabled={isLoadingGenders}
          onChange={handleFilterGenderOnChange}
        >
          {genders.length === 0 ? (
            <option>No available</option>
          ) : (
            <>
              <option value="">All categories</option>
              {genders.map((gender) => (
                <option value={gender}>{gender}</option>
              ))}
            </>
          )}
        </select>
        <button onClick={handleFilterOrderOnChange}>
          {orderButtonText[filters.orderBy]}
        </button>
      </div>
      {isLoadingMovies ? (
        <div className="movie-library__loading">
          <div className="movie-library__loading-spinner" />
        </div>
      ) : (
        <div className="movie-library__list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-library__card">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = NotFoundImage;
                }}
              />
              <div>
                <p className="movie-library__cardtitle">{movie.title}</p>
                <p>{movie.genres?.join(", ")}</p>
                <p>{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}