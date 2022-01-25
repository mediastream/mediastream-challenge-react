/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * [READY] 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * [READY] 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * [READY] 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * [READY] 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */
import { useCallback, useState } from "react";

import useRequest from "./hooks/useRequest";
import { getMovies } from "./services/movies";
import { getGenres } from "./services/genres";
import { ORDER_LIST } from "./constants";

import { MovieLibraryProvider } from "./context/MovieLibraryContext";
import { Filters, MoviesList } from "./components";

import "./assets/styles.css";

export default function Exercise02() {
  const [movies, , loadingMovies] = useRequest({
    request: getMovies,
    initialData: [],
    payload: { limit: 50 },
  });

  const [genres, , loadingGenres] = useRequest({
    request: getGenres,
    initialData: [],
  });

  const [selectedGenre, setSelectedGenre] = useState("");
  const [order, setOrder] = useState(ORDER_LIST.ASC.value);
  const handleChangeOrder = useCallback(() => {
    setOrder((prevOrder) =>
      prevOrder === ORDER_LIST.ASC.value
        ? ORDER_LIST.DESC.value
        : ORDER_LIST.ASC.value
    );
  }, []);

  return (
    <MovieLibraryProvider
      value={{
        movies: {
          list: movies,
          loading: loadingMovies,
        },
        genres: {
          list: genres,
          loading: loadingGenres,
        },
        filters: {
          selectedGenre: {
            value: selectedGenre,
            setSelectedGenre: setSelectedGenre,
          },
          order: {
            value: order,
            setOrder: handleChangeOrder,
          },
        },
      }}
    >
      <section className="movie-library">
        <div className="movie-library__header">
          <h1 className="movie-library__title">Movie Library</h1>

          <Filters />
        </div>
        <div className="movie-library__content">
          {loadingMovies && loadingGenres ? (
            <div className="movie-library__loading">
              <p>Loading...</p>
            </div>
          ) : (

            <MoviesList />
          )}
        </div>
      </section>
    </MovieLibraryProvider>
  );
}
