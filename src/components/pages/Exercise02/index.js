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
import { fetchApi } from "./api";

const URL = "http://localhost:3001";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [genres, setGenres] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDescending, setIsDescending] = useState(true);

  const handleMovieFetch = async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    const resp = await fetchApi(`${URL}/movies?_limit=50`);
    let newArray = [];
    for (let i = 0; i < resp.length; i++) {
      const response = await fetch(resp[i].posterUrl)
        .then((res) => res.status)
        .catch(() => {});
      if (response === 200) {
        newArray = [...newArray, resp[i]];
      }
    }
    setMovies(newArray);
    setMoviesFilter(newArray);
    setLoading(false);
  };

  const handleGenresFetch = async () => {
    const resp = await fetchApi(`${URL}/genres`);
    setGenres(resp);
  };

  const handleChange = (e) => {
    //setSelectGenre(e.target.value);
    const genre = e.target.value;
    genre !== "all"
      ? setMoviesFilter(
          movies.filter(({ genres }) => genres.find((e) => e === genre))
        )
      : setMoviesFilter(movies);
  };

  const handleOrder = () => {
    setIsDescending(!isDescending);
  };

  // const handleImageError = async (url) => {
  //   const {resp} = await fetchApi(url);
  //   console.log(resp);
  //   return resp.length > 0 ? true : false;
  // };

  useEffect(() => {
    if (isDescending) {
      const array = [...moviesFilter];
      array.sort((a, b) => a.year - b.year);
      setMoviesFilter(array);
    } else {
      const array = [...moviesFilter];
      array.sort((a, b) => b.year - a.year);
      setMoviesFilter(array);
    }
  }, [isDescending]);

  useEffect(() => {
    handleMovieFetch();
    handleGenresFetch();
  }, []);

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          onChange={handleChange}
        >
          <option value={"all"}>All</option>
          {genres.map((genres, index) => (
            <option value={genres} key={genres + index}>
              {genres}
            </option>
          ))}
        </select>
        <button onClick={handleOrder}>
          {isDescending ? "Year Descending" : "Year Ascending"}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <div className="movie-library__list">
          {moviesFilter.map((movie) => (
            <article key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li>{movie.title}</li>
                <li>{movie.genres.join(", ")}</li>
                <li>{movie.year}</li>
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
