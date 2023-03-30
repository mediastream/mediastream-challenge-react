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
import Filters from "./Filters";
import { getMovies } from "./services/movies";
import { getGenres } from "./services/genres";
import MovieCard from "./MovieCard";

export default function Exercise02() {
  const [moviesList, setMoviesList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(null);
  const [orderSelected, setOrderSelected] = useState("desc");
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGenreFetch = async () => {
    setLoading(true);
    const res = await getGenres();
    if (res != null) {
      setGenresList(res);
      if (res.length > 0) {
        setGenreSelected(res[0]);
      }
    }
  };

  const handleMovieFetch = async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    const res = await getMovies({
      genres: genreSelected,
      order: orderSelected,
    });
    if (res != null) {
      setMoviesList(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGenreFetch();
  }, []);

  useEffect(() => {
    if (genreSelected) {
      handleMovieFetch();
    }
  }, [genreSelected, orderSelected]);

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <Filters
        loading={loading}
        genres={genresList}
        order={orderSelected}
        handleChangeGenre={(g) => setGenreSelected(g)}
        handleChangeOrder={() =>
          setOrderSelected(orderSelected === "asc" ? "desc" : "asc")
        }
      />
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {moviesList.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </ul>
      )}
    </section>
  );
}
