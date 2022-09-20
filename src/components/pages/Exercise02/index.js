/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following
 * the next steps:
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
import montains from "./assets/mountains.jpeg";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [isDescending, setIsDescending] = useState(true);

  const handleMovieFetch = async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    try {
      await fetch("http://localhost:3001/movies?_limit=50")
        .then((res) => res.json())
        .then((json) => {
          setMovies(json);
        });

      await fetch("http://localhost:3001/genres")
        .then((res) => res.json())
        .then((json) => {
          setGenres(json);
        });
    } catch (error) {
      console.log("Run yarn movie-api for fake api");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleMovieFetch();
  }, []);

  const handleFilterNSorting = () =>
    movies
      .map((movie) => ({ ...movie, key: movie.id }))
      .filter((movie) => {
        console.log(movie.genres, selectedGenre);
        return selectedGenre ? movie.genres.includes(selectedGenre) : true;
      })
      .sort((a, b) => {
        return isDescending ? a.year - b.year : b.year - a.year;
      });
  return (
    <>
      <img src={montains} className="background" />
      <div className="gradient"></div>
      <section className="movie-library">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            name="genre"
            placeholder="Search by genre..."
            onChange={(genre) => setSelectedGenre(genre.target.value)}
          >
            {genres.map((genres) => (
              <option value={genres}>{genres}</option>
            ))}
          </select>
          <button onClick={() => setIsDescending(!isDescending)}>
            {isDescending ? "Year Descending" : "Year Ascending"}
          </button>
        </div>
        {loading ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
          </div>
        ) : (
          <ul className="movie-library__list">
            {handleFilterNSorting().map((movie) => (
              <li key={movie.id} className="movie-library__card">
                <img src={movie.posterUrl} alt={movie.title} />
                <ul>
                  <li className="title"> {movie.title}</li>
                  <li> {movie.year}</li>
                  <li> {movie.genres.join(", ")}</li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
