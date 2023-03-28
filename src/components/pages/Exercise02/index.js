/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 *    list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import { useCallback, useEffect, useState } from "react";
import Loader from "./components/Loader";
import Actions from "./components/Actions";
import MovieList from "./components/MovieList";
import "./assets/styles.css";

const API_URL = "http://localhost:3001";

const Exercise02 = () => {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [order, setOrder] = useState("asc");

  const [loading, setLoading] = useState(false);

  const handleMovieFetch = useCallback(() => {
    if (!loading) setLoading(true);
    setFetchCount(fetchCount + 1);
    const genred = selectedGenre ? `genres_like=${selectedGenre}` : "";
    const limited = "_limit=50";
    const yeared = `_sort=year&_order=${order}`;
    const filters = [genred, yeared, limited].filter(Boolean).join("&");
    fetch(`${API_URL}/movies?${filters}`)
      .then((res) => res.json())
      .then((json) => setMovies(json))
      .catch(() => console.log("Run yarn movie-api for fake api"))
      .finally(() => setLoading(false));
  }, [selectedGenre, order]);

  const handleGenreFetch = () => {
    if (!loading) setLoading(true);
    fetch(`${API_URL}/genres`)
      .then((res) => res.json())
      .then((json) => setGenres(json))
      .catch(() => console.log("Run yarn movie-api for fake api"))
      .finally(() => setLoading(false));
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    setFetchCount(0);
    handleMovieFetch();
  }, [selectedGenre, order]);

  useEffect(() => {
    handleGenreFetch();
    handleMovieFetch();
  }, []);

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>

      <Actions
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        toggleOrder={toggleOrder}
        order={order}
      />

      {loading && <Loader fetchCount={fetchCount} />}

      {!loading && <MovieList movies={movies} />}
    </section>
  );
};

export default Exercise02;
