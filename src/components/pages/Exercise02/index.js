/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * [OK] 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * [OK] 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * [OK] 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import { filterByGender, getInitialData } from "./services";
import { Filter } from "./components/filter";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genderFilter, setGenderFilter] = useState([]);
  const [genderSelected, setGenderSelected] = useState("");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    onSelectGenderFilter(order);
  }, [genderSelected]);

  const onSelectGenderFilter = async (filterOrder) => {
    setLoading(true);
    const filterResult = await filterByGender(genderSelected, filterOrder);
    if (filterResult.length > 0) setMovies(filterResult);
    setLoading(false);
  };

  const onChangeOrder = (newOrder) => {
    setOrder(newOrder);
    onSelectGenderFilter(newOrder);
  };

  const loadInitialData = async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    const { genderList, moviesList } = await getInitialData();
    setMovies(moviesList);
    setGenderFilter(genderList);
    setLoading(false);
  };

  const Loading = () => (
    <div className="movie-library__loading">
      <p>Loading...</p>
      <p>Fetched {fetchCount} times</p>
    </div>
  );

  const Movies = () => {
    return (
      <ul className="movie-library__list">
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => (
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
    );
  };

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library {genderSelected}</h1>
      <Filter
        filters={genderFilter}
        selectFilter={setGenderSelected}
        onChangeOrder={onChangeOrder}
        order={order}
      />
      {loading ? <Loading /> : <Movies />}
    </section>
  );
}
